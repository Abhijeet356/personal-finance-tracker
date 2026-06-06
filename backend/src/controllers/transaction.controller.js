import Transaction from "../models/transaction.model.js";

const getBalanceDelta = (transaction) => {
  if (!transaction) {
    return 0;
  }

  return transaction.type === "income" ? transaction.amount : -transaction.amount;
};

const applyBalanceDelta = async (user, delta) => {
  if (delta === 0) {
    return user;
  }

  user.currentBalance += delta;
  await user.save();

  return user;
};

const buildTransactionQuery = (userId, query) => {
  const filter = { user: userId };

  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.month && query.year) {
    const month = Number(query.month);
    const year = Number(query.year);
    filter.date = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    };
  }

  return filter;
};

export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
    });

    await applyBalanceDelta(req.user, getBalanceDelta(transaction));

    res.status(201).json({
      success: true,
      transaction,
      currentBalance: req.user.currentBalance,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const filter = buildTransactionQuery(req.user._id, req.query);
    const transactions = await Transaction.find(filter).sort({
      date: -1,
      createdAt: -1,
      _id: -1,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const existingTransaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const previousBalanceDelta = getBalanceDelta(existingTransaction);

    Object.assign(existingTransaction, req.body);
    await existingTransaction.save();

    const nextBalanceDelta = getBalanceDelta(existingTransaction);
    await applyBalanceDelta(
      req.user,
      nextBalanceDelta - previousBalanceDelta
    );

    res.status(200).json({
      success: true,
      transaction: existingTransaction,
      currentBalance: req.user.currentBalance,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await applyBalanceDelta(req.user, -getBalanceDelta(transaction));

    res.status(200).json({
      success: true,
      message: "Transaction deleted",
      currentBalance: req.user.currentBalance,
    });
  } catch (error) {
    next(error);
  }
};
