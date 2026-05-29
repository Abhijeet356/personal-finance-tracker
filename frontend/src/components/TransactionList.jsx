"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  FaEdit,
  FaTrash,
  FaUtensils,
  FaShoppingBag,
  FaPlane,
  FaBolt,
  FaGamepad,
} from "react-icons/fa";

export default function TransactionList({
  transactions,
  setTransactions,
  balance,
  setBalance,
  income,
  expenses,
  savings,
  setShowFilters,
  showFilters,
}) {
  const { darkMode } = useTheme();

  const [selected, setSelected] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const categoryIcons = {
    Food: <FaUtensils />,

    Shopping: <FaShoppingBag />,

    Travel: <FaPlane />,

    Bills: <FaBolt />,

    Entertainment: <FaGamepad />,
  };

  // DELETE

  const handleDelete = (transaction) => {
    const updatedTransactions = transactions.filter(
      (item) => item.id !== transaction.id,
    );

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    if (transaction.type === "expense") {
      setBalance((prev) => prev + transaction.amount);

      setExpenses((prev) => prev - transaction.amount);

      setSavings((prev) => prev + transaction.amount);
    } else {
      setBalance((prev) => prev - transaction.amount);

      setIncome((prev) => prev - transaction.amount);

      setSavings((prev) => prev - transaction.amount);
    }
    localStorage.setItem(
      "balance",
      transaction.type === "expense"
        ? balance + transaction.amount
        : balance - transaction.amount,
    );

    localStorage.setItem(
      "expenses",
      transaction.type === "expense" ? expenses - transaction.amount : expenses,
    );

    localStorage.setItem(
      "income",
      transaction.type === "income" ? income - transaction.amount : income,
    );

    localStorage.setItem(
      "savings",
      transaction.type === "expense"
        ? savings + transaction.amount
        : savings - transaction.amount,
    );

    setSelected(null);
  };
  // SAVE EDIT

  const handleSaveEdit = () => {
    const oldTransaction = transactions.find((item) => item.id === selected.id);

    // REMOVE OLD EFFECT

    if (oldTransaction.type === "expense") {
      setBalance((prev) => prev + oldTransaction.amount);

      setExpenses((prev) => prev - oldTransaction.amount);

      setSavings((prev) => prev + oldTransaction.amount);
    } else {
      setBalance((prev) => prev - oldTransaction.amount);

      setIncome((prev) => prev - oldTransaction.amount);

      setSavings((prev) => prev - oldTransaction.amount);
    }

    // APPLY NEW EFFECT

    if (selected.type === "expense") {
      setBalance((prev) => prev - selected.amount);

      setExpenses((prev) => prev + selected.amount);

      setSavings((prev) => prev - selected.amount);
    } else {
      setBalance((prev) => prev + selected.amount);

      setIncome((prev) => prev + selected.amount);

      setSavings((prev) => prev + selected.amount);
    }

    // UPDATE TRANSACTION

    const updatedTransactions = transactions.map((item) =>
      item.id === selected.id ? selected : item,
    );

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

    localStorage.setItem("balance", balance);

    localStorage.setItem("income", income);

    localStorage.setItem("expenses", expenses);

    localStorage.setItem("savings", savings);

    setIsEditing(false);
  };

  return (
    <div
      className={`relative z-10 p-8 rounded-3xl shadow-xl transition-all duration-300 ${
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <h1
          className={`text-4xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Transactions
        </h1>

        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            className="text-yellow-600 font-semibold text-lg transition-all
      duration-300

      hover:text-orange-600
      hover:translate-x-1"
          >
            View All
          </button>
        )}
      </div>

      {/* EMPTY STATE */}

      {transactions.length === 0 && (
        <div
          className={`text-center py-16 rounded-3xl ${
            darkMode ? "bg-slate-700" : "bg-slate-100"
          }`}
        >
          <h2 className="text-2xl font-bold">No Transactions Yet</h2>
        </div>
      )}

      {/* LIST */}

      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item._id || item.id}
            onClick={() => {
              setSelected(item);
              setIsEditing(false);
            }}
            className={`flex justify-between items-center p-5 rounded-2xl border-l-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              item.type === "expense" ? "border-red-500" : "border-green-500"
            } ${
              darkMode
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {/* LEFT */}

            <div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </h2>

              <p
                className={`text-lg font-semibold mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* RIGHT */}

            <div className="text-right">
              <h1
                className={`text-3xl font-bold ${
                  item.type === "expense" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.type === "expense" ? "-" : "+"}₹{item.amount}
              </h1>

              <p
                className={`text-sm font-semibold mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`w-[520px] p-8 rounded-[32px] shadow-2xl relative overflow-hidden ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
            }`}
          >
            {/* GLOW */}

            <div
              className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-30 ${
                selected.type === "expense" ? "bg-red-500" : "bg-green-500"
              }`}
            ></div>

            {/* HEADER */}

            <div className="relative z-10 flex justify-between items-start">
              <div className="w-full pr-4">
                <p
                  className={`mt-3 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(selected.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className={`text-2xl hover:scale-110 transition ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                ✕
              </button>
            </div>

            {/* DETAILS */}

            <div className="relative z-10 mt-8 space-y-6">
              {/* AMOUNT */}

              <div className="flex justify-between items-center">
                <span className="opacity-70">Amount</span>

                {isEditing ? (
                  <input
                    type="number"
                    value={selected.amount}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        amount: Number(e.target.value),
                      })
                    }
                    className={`w-36 px-4 py-2 rounded-xl outline-none border-2 text-right ${
                      darkMode
                        ? "bg-slate-700 border-green-500 text-white"
                        : "bg-green-50 border-green-400 text-black"
                    }`}
                  />
                ) : (
                  <span
                    className={`font-bold text-2xl ${
                      selected.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    ₹{selected.amount}
                  </span>
                )}
              </div>

              {/* TYPE */}

              <div className="flex justify-between items-center">
                <span className="opacity-70">Type</span>

                <span className="font-semibold capitalize">
                  {selected.type}
                </span>
              </div>

              {/* PAYMENT */}

              <div className="flex justify-between items-center">
                <span className="opacity-70">Payment</span>

                {isEditing ? (
                  <select
                    value={selected.paymentMethod}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        paymentMethod: e.target.value,
                      })
                    }
                    className={`px-4 py-2 rounded-xl outline-none border-2 ${
                      darkMode
                        ? "bg-slate-700 border-blue-500 text-white"
                        : "bg-blue-50 border-blue-400 text-black"
                    }`}
                  >
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Net Banking</option>
                  </select>
                ) : (
                  <span className="font-semibold">
                    {selected.paymentMethod}
                  </span>
                )}
              </div>

              {/* CATEGORY */}

              <div className="flex justify-between items-center">
                <span className="opacity-70">Category</span>

                {isEditing ? (
                  <select
                    value={selected.category}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        category: e.target.value,
                      })
                    }
                    className={`px-4 py-2 rounded-xl outline-none border-2 ${
                      darkMode
                        ? "bg-slate-700 border-yellow-500 text-white"
                        : "bg-yellow-50 border-yellow-400 text-black"
                    }`}
                  >
                    <option>Food</option>
                    <option>Shopping</option>
                    <option>Travel</option>
                    <option>Bills</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <span className="font-semibold">{selected.category}</span>
                )}
              </div>

              {/* NOTES */}

              <div>
                <p className="opacity-70 mb-2">Notes</p>

                {isEditing ? (
                  <textarea
                    rows={4}
                    value={selected.notes}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        notes: e.target.value,
                      })
                    }
                    className={`w-full p-4 rounded-2xl outline-none resize-none border-2 ${
                      darkMode
                        ? "bg-slate-700 border-purple-500 text-white"
                        : "bg-purple-50 border-purple-400 text-black"
                    }`}
                  />
                ) : (
                  <div
                    className={`p-4 rounded-2xl ${
                      darkMode ? "bg-slate-700" : "bg-slate-100"
                    }`}
                  >
                    {selected.notes || "No notes added"}
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS */}

            <div className="relative z-10 flex gap-4 mt-8">
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white shadow-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-all duration-300 text-white shadow-lg flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(selected)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition-all duration-300 text-white shadow-lg flex items-center justify-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
