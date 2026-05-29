"use client";

import { useTheme } from "@/context/ThemeContext";

export default function SummaryCards({ balance, income, expenses, savings }) {
  const { darkMode } = useTheme();

  const cards = [
    {
      title: "Total Balance",
      amount: `₹${balance.toLocaleString()}`,
      image: "/images/wallet-bg.png",
      glow: "from-blue-700 to-cyan-500",
    },

    {
      title: "Expenses",
      amount: `₹${expenses.toLocaleString()}`,
      image: "/images/down-bg.png",
      glow: "from-red-700 to-pink-500",
    },

    {
      title: "Savings",
      amount: `₹${savings.toLocaleString()}`,
      image: "/images/up-bg.png",
      glow: "from-green-700 to-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-[32px] h-[210px] p-7 shadow-2xl hover:scale-[1.03] transition-all duration-500 group"
        >
          {/* BACKGROUND IMAGE */}

          <img
            src={card.image}
            alt="card-bg"
            className="absolute inset-0 w-full h-full object-cover object-center scale-100 opacity-35"
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>

          {/* GLOW */}

          <div
            className={`absolute -top-16 -right-16 w-72 h-72 rounded-full blur-[120px] opacity-50 bg-gradient-to-br ${card.glow}`}
          ></div>

          {/* CONTENT */}

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* TOP */}

            <div>
              <p className="text-white-300 text-2xl">{card.title}</p>

              <h1 className="text-5xl font-bold text-white mt-3 tracking-tight">
                {card.amount}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
