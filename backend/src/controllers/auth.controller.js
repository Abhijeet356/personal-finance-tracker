import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import Category from "../models/category.model.js";
import RecurringRule from "../models/recurringRule.model.js";
import createDefaultCategories from "../utils/createDefaultCategories.js";
import processRecurringRules from "../utils/processRecurringRules.js";
import sendTokenResponse from "../utils/sendTokenResponse.js";

const userPayload = (user) => {
  const monthlyBudget = user.monthlyBudget ?? 0;

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    currentBalance: user.currentBalance,
    monthlySalary: user.monthlySalary,
    monthlyBudget,
    avatar: user.avatar,
    currency: user.currency,
    financialGoal: user.financialGoal,
    memberSince: user.createdAt,
    onboardingComplete: user.onboardingComplete,
  };
};

const getMonthKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const maybeCreditMonthlySalary = async (user) => {
  const now = new Date();

  if (!user.monthlySalary) {
    return user;
  }

  const monthKey = getMonthKey(now);

  if (user.lastSalaryCreditMonth === monthKey) {
    return user;
  }

  await Transaction.create({
    user: user._id,
    type: "income",
    amount: user.monthlySalary,
    category: "Salary",
    description: `Monthly salary - ${monthKey}`,
    date: now,
    paymentMethod: "bank_transfer",
  });

  user.currentBalance += user.monthlySalary;
  user.lastSalaryCreditMonth = monthKey;
  await user.save();

  return user;
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, monthlyBudget } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      monthlyBudget: monthlyBudget ?? 0,
    });

    await createDefaultCategories(user._id);

    sendTokenResponse(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendTokenResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    let user = await maybeCreditMonthlySalary(req.user);
    await processRecurringRules(user);

    res.status(200).json({
      success: true,
      user: userPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

export const completeOnboarding = async (req, res, next) => {
  try {
    const {
      avatar,
      currency,
      currentBalance,
      financialGoal,
      monthlyBudget,
      monthlySalary,
      name,
    } = req.body;
    const user = req.user;
    const budget = monthlyBudget ?? monthlySalary ?? 0;
    const hasSeparateSalary = monthlyBudget !== undefined;

    user.currentBalance = currentBalance;
    user.monthlyBudget = budget;

    if (name !== undefined) {
      user.name = name;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (currency !== undefined) {
      user.currency = currency;
    }

    if (financialGoal !== undefined) {
      user.financialGoal = financialGoal;
    }

    if (monthlySalary !== undefined && hasSeparateSalary) {
      user.monthlySalary = monthlySalary;
    } else if (!hasSeparateSalary) {
      user.monthlySalary = 0;
    }

    user.onboardingComplete = true;


    if (hasSeparateSalary && monthlySalary > 0 && new Date().getDate() === 1) {
      await Transaction.create({
        user: user._id,
        type: "income",
        amount: monthlySalary,
        category: "Salary",
        description: `Monthly salary - ${getMonthKey()}`,
        date: new Date(),
        paymentMethod: "bank_transfer",
      });
      user.currentBalance += monthlySalary;
      user.lastSalaryCreditMonth = getMonthKey();
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: userPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const {
      avatar,
      currency,
      currentBalance,
      email,
      financialGoal,
      monthlyBudget,
      monthlySalary,
      name,
    } = req.body;
    const user = req.user;

    if (email !== undefined && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }

      user.email = email;
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (currentBalance !== undefined) {
      user.currentBalance = currentBalance;
    }

    if (monthlySalary !== undefined) {
      user.monthlySalary = monthlySalary;
    }

    if (monthlyBudget !== undefined) {
      user.monthlyBudget = monthlyBudget;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (currency !== undefined) {
      user.currency = currency;
    }

    if (financialGoal !== undefined) {
      user.financialGoal = financialGoal;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: userPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await Transaction.deleteMany({
      user: req.user._id,
    });

    await Category.deleteMany({
      user: req.user._id,
    });

    await RecurringRule.deleteMany({
      user: req.user._id,
    });

    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
