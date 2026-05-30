"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";

export default function AddTransactionModal({ isOpen, onClose, onSave }) {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    paymentMethod: "upi",
    notes: "",
    date: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      type: "expense",
      category: "Food",
      paymentMethod: "upi",
      notes: "",
      date: "",
    });
  };
  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.amount ||
      !formData.date ||
      !formData.paymentMethod
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("FORM DATA:", formData);
  const response = await api.post("/transactions", {
    amount: Number(formData.amount),
    type: formData.type,
    category: formData.category,
    description: formData.notes,
    date: formData.date,
    paymentMethod: formData.paymentMethod,
  });

  console.log(response.data);
  onSave(response.data.transaction);
  onClose();
} catch (error) {
  console.error(error.response?.data);

  alert(
    JSON.stringify(error.response?.data, null, 2)
  );
}

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      paymentMethod: "upi",
      notes: "",
      date: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            className={`w-full max-w-2xl backdrop-blur-2xl rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 ${
              darkMode
                ? "bg-[#1e293b]/95 border border-white/20 text-white"
                : "bg-white border border-slate-200 text-black"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              New Transaction
            </h2>

            <div className="space-y-5">
              {/* AMOUNT */}

              <div>
                <label
                  className={`mb-2 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  placeholder="₹0"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`w-full rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                    darkMode
                      ? "bg-white/10 border-white/10 text-white placeholder:text-gray-400"
                      : "bg-slate-100 border-slate-300 text-black placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* EXPENSE / INCOME */}

              <div>
                <label
                  className={`mb-3 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Type
                </label>

                <div className="flex bg-white/5 p-1 rounded-2xl w-fit">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: "expense",
                      }))
                    }
                    className={`w-28 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      formData.type === "expense"
                        ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                        : "text-gray-400"
                    }`}
                  >
                    Expense
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: "income",
                      }))
                    }
                    className={`w-28 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      formData.type === "income"
                        ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                        : "text-gray-400"
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              {/* CATEGORY */}

              <div>
                <label
                  className={`mb-2 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                    darkMode
                      ? "bg-white/10 border-white/10 text-white"
                      : "bg-slate-100 border-slate-300 text-black"
                  }`}
                >
                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Food
                  </option>

                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Shopping
                  </option>

                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Bills
                  </option>

                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Entertainment
                  </option>

                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Travel
                  </option>
                  <option
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* PAYMENT MODE */}

              <div>
                <label
                  className={`mb-2 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Payment Mode
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`w-full rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                    darkMode
                      ? "bg-white/10 border-white/10 text-white"
                      : "bg-slate-100 border-slate-300 text-black"
                  }`}
                >
                  <option value="upi"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    UPI
                  </option>

                  <option value="cash"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Cash
                  </option>

                  <option value="card"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Card
                  </option>

                  <option value="bank_transfer"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Net Banking
                  </option>

                  <option value="other"
                    className={
                      darkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-black"
                    }
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  className={`mb-2 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Description
                </label>

                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Add description..."
                  value={formData.notes}
                  onChange={handleChange}
                  className={`w-full rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                    darkMode
                      ? "bg-white/10 border-white/10 text-white placeholder:text-gray-400"
                      : "bg-slate-100 border-slate-300 text-black placeholder:text-gray-500"
                  }`}
                />
              </div>

              {/* DATE */}

              <div>
                <label
                  className={`mb-2 block ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full rounded-2xl px-5 py-4 outline-none border-2 transition-all ${
                    darkMode
                      ? "bg-white/10 border-white/10 text-white"
                      : "bg-slate-100 border-slate-300 text-black"
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className={`flex-1 py-4 rounded-2xl ${
                  darkMode ? "bg-white/10 text-white" : "bg-gray-200 text-black"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`flex-1 py-4 rounded-2xl ${
                  darkMode
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white"
                    : "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                }`}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
