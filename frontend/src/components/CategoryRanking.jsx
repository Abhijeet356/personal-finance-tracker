"use client";

import {
  FaUtensils,
  FaShoppingBag,
  FaPlane,
  FaBolt,
  FaGamepad,
} from "react-icons/fa";

import { useTheme } from "@/context/ThemeContext";

export default function CategoryRanking({ transactions }) {
  const { darkMode } = useTheme();

  // CATEGORY ICONS

  const categoryIcons = {
    Food: <FaUtensils />,

    Shopping: <FaShoppingBag />,

    Travel: <FaPlane />,

    Bills: <FaBolt />,

    Entertainment: <FaGamepad />,
  };

  // CATEGORY TOTALS

  const categoryTotals = {};

  transactions.forEach((item) => {
    if (item.type === "expense") {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }

      categoryTotals[item.category] += item.amount;
    }
  });

  // SORTED RANKINGS

  const rankings = Object.entries(categoryTotals)

    .sort((a, b) => b[1] - a[1]);

  return (
    <div
      className={`app-surface p-6 ${
        darkMode ? "app-surface-dark" : "app-surface-light"
      }`}
    >
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Category Rankings</h1>

        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Highest spending categories
        </p>
      </div>

      {/* RANKINGS */}

      <div className="space-y-5">
        {rankings.map(([category, amount], index) => (
          <div
            key={category}
            className={`app-panel flex items-center justify-between p-5 ${
              darkMode ? "app-panel-dark" : "app-panel-light"
            }`}
          >
            {/* LEFT */}

            <div className="flex items-center gap-4">
              {/* RANK */}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index === 0
                    ? "bg-yellow-500 text-black"
                    : index === 1
                      ? "bg-gray-400 text-black"
                      : index === 2
                        ? "bg-orange-500 text-black"
                        : darkMode
                          ? "bg-slate-600 text-white"
                          : "bg-slate-300 text-black"
                }`}
              >
                #{index + 1}
              </div>

              {/* ICON */}

              <div
                className={`text-2xl ${
                  darkMode ? "text-violet-400" : "text-violet-600"
                }`}
              >
                {categoryIcons[category]}
              </div>

              {/* CATEGORY */}

              <div>
                <h1 className="text-xl font-bold">{category}</h1>

                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Expense Category
                </p>
              </div>
            </div>

            {/* AMOUNT */}

            <h1 className="text-2xl font-bold text-red-500">
              ₹{amount.toLocaleString()}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
