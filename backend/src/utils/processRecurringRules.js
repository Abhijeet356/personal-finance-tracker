import RecurringRule from "../models/recurringRule.model.js";
import Transaction from "../models/transaction.model.js";

const addOneMonth = (date) => {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + 1);

  return nextDate;
};

const getBalanceDelta = (rule) =>
  rule.type === "income" ? rule.amount : -rule.amount;

const processRecurringRules = async (user, now = new Date()) => {
  const dueRules = await RecurringRule.find({
    user: user._id,
    isActive: true,
    nextRunDate: { $lte: now },
  });

  if (dueRules.length === 0) {
    return { createdCount: 0, currentBalance: user.currentBalance };
  }

  let createdCount = 0;

  for (const rule of dueRules) {
    let runDate = new Date(rule.nextRunDate);
    let safetyCounter = 0;

    while (runDate <= now && safetyCounter < 12) {
      await Transaction.create({
        user: user._id,
        type: rule.type,
        amount: rule.amount,
        category: rule.category,
        description:
          rule.description || rule.title || `Recurring ${rule.category}`,
        date: runDate,
        paymentMethod: rule.paymentMethod,
      });

      user.currentBalance += getBalanceDelta(rule);
      rule.lastRunDate = runDate;
      runDate = addOneMonth(runDate);
      createdCount += 1;
      safetyCounter += 1;
    }

    rule.nextRunDate = runDate;
    await rule.save();
  }

  await user.save();

  return { createdCount, currentBalance: user.currentBalance };
};

export default processRecurringRules;
