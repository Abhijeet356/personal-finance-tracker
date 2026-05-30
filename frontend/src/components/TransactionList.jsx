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
import api from "@/lib/api";

export default function TransactionList({
  transactions,
  setTransactions,
  setBalance,
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

  const handleDelete = async (transaction) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/transactions/${transaction._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTransactions = transactions.filter(
        (item) => item._id !== transaction._id,
      );

      setTransactions(updatedTransactions);

      // if (transaction.type === "expense") {
      //   setBalance((prev) => prev + transaction.amount);
      // } else {
      //   setBalance((prev) => prev - transaction.amount);
      // }

      setSelected(null);
    } catch (error) {
      console.error(error);
      console.error("Failed to delete transaction");
    }
  };
  // SAVE EDIT

  const handleSaveEdit = async () => {
    const oldTransaction = transactions.find(
      (item) => item._id === selected._id,
    );

    // if (oldTransaction.type === "expense") {
    //   setBalance((prev) => prev + oldTransaction.amount);
    // } else {
    //   setBalance((prev) => prev - oldTransaction.amount);
    // }

    // APPLY NEW EFFECT

    // if (selected.type === "expense") {
    //   setBalance((prev) => prev - selected.amount);
    // } else {
    //   setBalance((prev) => prev + selected.amount);
    // }

    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/transactions/${selected._id}`,
        {
          title: selected.title,
          amount: selected.amount,
          category: selected.category,
          paymentMethod: selected.paymentMethod,
          description: selected.description,
          type: selected.type,
          date: selected.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error(error.response?.data);
      return;
    }
    // UPDATE TRANSACTION

    const updatedTransactions = transactions.map((item) =>
      item._id === selected._id ? selected : item,
    );

    setTransactions(updatedTransactions);

    setIsEditing(false);
  };

  return (
    <div
      className={`app-surface relative z-10 p-6 md:p-8 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
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
          className={`app-panel text-center py-16 ${
            darkMode ? "app-panel-dark" : "app-panel-light"
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
            className={`app-panel flex justify-between items-center p-5 border-l-4 cursor-pointer ${
              item.type === "expense" ? "border-red-500" : "border-green-500"
            } ${
              darkMode ? "app-panel-dark hover:bg-slate-700" : "app-panel-light hover:bg-slate-100"
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
            className={`app-surface w-[520px] max-w-[calc(100vw-2rem)] p-8 relative overflow-hidden ${
              darkMode ? "app-surface-dark" : "app-surface-light"
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
                    className={`app-field w-36 px-4 py-2 text-right ${
                      darkMode
                        ? "app-field-dark"
                        : "app-field-light"
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
                    className={`app-field w-auto px-4 py-2 ${
                      darkMode ? "app-field-dark" : "app-field-light"
                    }`}
                  >
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank_transfer">Net Banking</option>
                    <option value="other">Other</option>
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
                    className={`app-field w-auto px-4 py-2 ${
                      darkMode ? "app-field-dark" : "app-field-light"
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
                    value={selected.description}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        description: e.target.value,
                      })
                    }
                    className={`app-field resize-none ${
                      darkMode ? "app-field-dark" : "app-field-light"
                    }`}
                  />
                ) : (
                  <div
                    className={`app-panel p-4 ${
                      darkMode ? "app-panel-dark" : "app-panel-light"
                    }`}
                  >
                    {selected.description || "No description added"}
                  </div>
                )}
              </div>
            </div>

            {/* BUTTONS */}

            <div className="relative z-10 flex gap-4 mt-8">
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="app-button flex-1 bg-emerald-600 py-3 text-white hover:bg-emerald-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="app-button app-button-primary flex-1 py-3"
                >
                  <FaEdit />
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(selected)}
                className="app-button app-button-danger flex-1 py-3"
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
