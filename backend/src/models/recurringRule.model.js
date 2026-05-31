import mongoose from "mongoose";

const recurringRuleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "other"],
      default: "other",
    },
    frequency: {
      type: String,
      enum: ["monthly"],
      default: "monthly",
    },
    nextRunDate: {
      type: Date,
      required: true,
    },
    lastRunDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

recurringRuleSchema.index({ user: 1, nextRunDate: 1, isActive: 1 });

const RecurringRule = mongoose.model("RecurringRule", recurringRuleSchema);

export default RecurringRule;
