"use client";

import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaPlus,
  FaRedoAlt,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import useCategories from "@/hooks/useCategories";

const getTodayInputDate = () => {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;

  return new Date(today.getTime() - timezoneOffset).toISOString().split("T")[0];
};

const initialForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "Rent",
  paymentMethod: "bank_transfer",
  description: "",
  nextRunDate: getTodayInputDate(),
};

export default function RecurringModal({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return <RecurringModalContent closeModal={closeModal} />;
}

function RecurringModalContent({ closeModal }) {
  const { darkMode } = useTheme();
  const { expenseCategories, incomeCategories } = useCategories();
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const categoriesForType =
    form.type === "income" ? incomeCategories : expenseCategories;
  const selectedCategory = categoriesForType.some(
    (category) => category.name === form.category,
  )
    ? form.category
    : categoriesForType[0]?.name || form.category;

  const loadRules = async () => {
    try {
      const response = await api.get("/recurring-rules");
      setRules(response.data.rules || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load recurring rules");
    }
  };

  useEffect(() => {
    Promise.resolve().then(loadRules);
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.amount || !selectedCategory || !form.nextRunDate) {
      alert("Please fill amount, category, and next run date");
      return;
    }

    const payload = {
      title: form.title.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: selectedCategory,
      paymentMethod: form.paymentMethod,
      description: form.description,
      nextRunDate: form.nextRunDate,
      frequency: "monthly",
      isActive: true,
    };

    try {
      if (editingId) {
        await api.put(`/recurring-rules/${editingId}`, payload);
      } else {
        await api.post("/recurring-rules", payload);
      }

      resetForm();
      loadRules();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save recurring rule");
    }
  };

  const handleEdit = (rule) => {
    setEditingId(rule._id);
    setForm({
      title: rule.title || "",
      amount: String(rule.amount),
      type: rule.type,
      category: rule.category,
      paymentMethod: rule.paymentMethod,
      description: rule.description || "",
      nextRunDate: new Date(rule.nextRunDate).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (rule) => {
    try {
      await api.delete(`/recurring-rules/${rule._id}`);
      loadRules();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete recurring rule");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-4 backdrop-blur-sm sm:items-center">
      <div
        className={`app-surface relative w-full max-w-5xl max-h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:p-8 ${
          darkMode ? "app-surface-dark" : "app-surface-light"
        }`}
      >
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 text-2xl text-slate-400 transition hover:text-red-500"
        >
          <FaTimes />
        </button>

        <div className="flex items-start gap-4 pr-10 sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white shadow-lg sm:h-20 sm:w-20 sm:text-4xl">
            <FaRedoAlt />
          </div>
          <div>
            <h1
              className={`text-2xl font-bold sm:text-4xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Recurring Transactions
            </h1>
            <p className={darkMode ? "mt-2 text-slate-400" : "mt-2 text-slate-600"}>
              Monthly bills and income are added automatically when due.
            </p>
          </div>
        </div>

        <div
          className={`mt-8 rounded-2xl border p-4 ${
            darkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Name, e.g. Rent"
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            />
            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="Amount"
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            />
            <input
              type="date"
              value={form.nextRunDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nextRunDate: e.target.value }))
              }
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            />
            <select
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  type: e.target.value,
                  category:
                    e.target.value === "income"
                      ? incomeCategories[0]?.name || "Salary"
                      : expenseCategories[0]?.name || "Rent",
                }))
              }
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            >
              {categoriesForType.map((category) => (
                <option
                  key={category._id || `${category.type}-${category.name}`}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={form.paymentMethod}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, paymentMethod: e.target.value }))
              }
              className={`app-field ${darkMode ? "app-field-dark" : "app-field-light"}`}
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank_transfer">Net Banking</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Description"
            rows={3}
            className={`app-field mt-4 ${darkMode ? "app-field-dark" : "app-field-light"}`}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleSave}
              className="app-button app-button-primary px-5 py-4"
            >
              <FaPlus />
              {editingId ? "Update Rule" : "Add Rule"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className={`app-button app-button-secondary px-5 py-4 ${
                  darkMode ? "bg-white/10 text-white hover:bg-white/15" : ""
                }`}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {rules.length === 0 ? (
            <div
              className={`app-panel p-6 text-center ${
                darkMode ? "app-panel-dark" : "app-panel-light"
              }`}
            >
              No recurring transactions yet
            </div>
          ) : (
            rules.map((rule) => (
              <div
                key={rule._id}
                className={`app-panel flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between ${
                  darkMode ? "app-panel-dark" : "app-panel-light"
                }`}
              >
                <div>
                  <h2 className="text-xl font-bold">
                    {rule.title || rule.category}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {rule.type} - {rule.category} - Rs {rule.amount.toLocaleString()}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <FaCalendarAlt />
                    Next run:{" "}
                    {new Date(rule.nextRunDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(rule)}
                    className="app-button bg-sky-600 px-4 py-3 text-white hover:bg-sky-700"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rule)}
                    className="app-button app-button-danger px-4 py-3"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
