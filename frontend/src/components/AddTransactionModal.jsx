"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import { PAYMENT_METHODS } from "@/constants/paymentMethods";

const getTodayInputDate = () => {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;

  return new Date(today.getTime() - timezoneOffset).toISOString().split("T")[0];
};

const getInitialFormData = () => ({
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
  paymentMethod: "upi",
  notes: "",
  date: getTodayInputDate(),
});

export default function AddTransactionModal({ isOpen, onClose, onSave }) {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState(getInitialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
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
  const response = await api.post("/transactions", {
    amount: Number(formData.amount),
    type: formData.type,
    category: formData.category,
    description: formData.notes,
    date: formData.date,
    paymentMethod: formData.paymentMethod,
  });

  onSave(response.data.transaction, response.data.currentBalance);
  onClose();
} catch (error) {
  console.error(error.response?.data);

  alert(
    JSON.stringify(error.response?.data, null, 2)
  );
}

    setFormData(getInitialFormData());
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
            className={`app-surface w-full max-w-2xl p-8 md:p-10 backdrop-blur-2xl ${
              darkMode ? "app-surface-dark" : "app-surface-light"
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
                  className={`app-field ${
                    darkMode ? "app-field-dark" : "app-field-light"
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

                <div
                  className={`app-panel flex w-fit p-1 ${
                    darkMode ? "app-panel-dark" : "app-panel-light"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        type: "expense",
                      }))
                    }
                    className={`app-button w-28 py-3 ${
                      formData.type === "expense"
                        ? "app-button-primary"
                        : darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-slate-500 hover:text-slate-950"
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
                    className={`app-button w-28 py-3 ${
                      formData.type === "income"
                        ? "app-button-primary"
                        : darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-slate-500 hover:text-slate-950"
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
                  className={`app-field ${
                    darkMode ? "app-field-dark" : "app-field-light"
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
                  className={`app-field ${
                    darkMode ? "app-field-dark" : "app-field-light"
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
                  className={`app-field ${
                    darkMode ? "app-field-dark" : "app-field-light"
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
                  className={`app-field ${
                    darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-button app-button-secondary flex-1 py-4 ${
                  darkMode ? "bg-white/10 text-white hover:bg-white/15" : ""
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="app-button app-button-primary flex-1 py-4"
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
