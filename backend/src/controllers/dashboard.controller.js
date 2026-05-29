import Transaction from "../models/transaction.model.js";

const getMonthRange = (query) => {
  const now = new Date();
  const month = Number(query.month) || now.getMonth() + 1;
  const year = Number(query.year) || now.getFullYear();

  return {
    startDate: new Date(year, month - 1, 1),
    endDate: new Date(year, month, 1),
  };
};

export const getSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = getMonthRange(req.query);

    const [totals, recentTransactions] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            user: req.user._id,
            date: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]),
      Transaction.find({ user: req.user._id }).sort({ date: -1 }).limit(5),
    ]);

    const totalIncome = totals.find((item) => item._id === "income")?.total || 0;
    const totalExpenses =
      totals.find((item) => item._id === "expense")?.total || 0;

    res.status(200).json({
      success: true,
      totalIncome,
      totalExpenses,
      balance: req.user.currentBalance,
      monthlyBudget: req.user.monthlyBudget,
      budgetUsed: totalExpenses,
      budgetRemaining: req.user.monthlyBudget - totalExpenses,
      isBudgetExceeded: totalExpenses > req.user.monthlyBudget,
      recentTransactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthly = async (req, res, next) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const monthly = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      year,
      monthly,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBreakdown = async (req, res, next) => {
  try {
    const { startDate, endDate } = getMonthRange(req.query);
    const type = req.query.type || "expense";

    const categories = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      type,
      categories,
    });
  } catch (error) {
    next(error);
  }
};
