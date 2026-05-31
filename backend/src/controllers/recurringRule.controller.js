import RecurringRule from "../models/recurringRule.model.js";

export const createRecurringRule = async (req, res, next) => {
  try {
    const rule = await RecurringRule.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      rule,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecurringRules = async (req, res, next) => {
  try {
    const rules = await RecurringRule.find({ user: req.user._id }).sort({
      isActive: -1,
      nextRunDate: 1,
    });

    res.status(200).json({
      success: true,
      count: rules.length,
      rules,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecurringRule = async (req, res, next) => {
  try {
    const rule = await RecurringRule.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Recurring rule not found",
      });
    }

    res.status(200).json({
      success: true,
      rule,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecurringRule = async (req, res, next) => {
  try {
    const rule = await RecurringRule.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Recurring rule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recurring rule deleted",
    });
  } catch (error) {
    next(error);
  }
};
