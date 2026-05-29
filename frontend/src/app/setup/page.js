"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";

export default function SetupPage() {
  const router = useRouter();

  const { darkMode } = useTheme();

  useEffect(() => {
    const existingUser = localStorage.getItem("user_setup");

    if (existingUser) {
      router.push("/dashboard");
    }
  }, []);

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [budget, setBudget] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [financialGoal, setFinancialGoal] = useState("Save More");

  // SAVE SETUP

  const handleContinue = async () => {
    if (!name || !balance || !budget) {
      alert("Please fill all required fields.");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/auth/onboarding",

        {
          currentBalance: Number(balance),
          monthlySalary: Number(budget),
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      // OPTIONAL LOCAL STORAGE

      const userData = {
        name,
        avatar,
        currency,
        financialGoal,
      };

      localStorage.setItem("user_setup", JSON.stringify(userData));

      router.push("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Setup failed");
    }
    e;
  };

  // IMAGE UPLOAD

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 py-10 transition-all duration-300 ${
        darkMode ? "bg-[#0f172a]" : "bg-[#f8fafc]"
      }`}
    >
      <div
        className={`w-full max-w-xl rounded-[40px] p-8 md:p-10 shadow-2xl border ${
          darkMode ? "bg-[#111827] border-white/10" : "bg-white border-gray-200"
        }`}
      >
        {/* HEADING */}

        <div className="text-center mb-10">
          <h1
            className={`text-5xl font-bold ${
              darkMode ? "text-white" : "text-[#0f172a]"
            }`}
          >
            Welcome 👋
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Let&apos;s personalize your finance dashboard.
          </p>
        </div>

        {/* AVATAR */}

        <div className="flex flex-col items-center mb-10">
          <div
            className={`w-28 h-28 rounded-full overflow-hidden border-4 ${
              darkMode ? "border-white/10" : "border-gray-200"
            }`}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                {name ? name[0] : "A"}
              </div>
            )}
          </div>

          <label className="mt-5 cursor-pointer text-violet-500 font-semibold">
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* CURRENCY */}

        <div>
          <label
            className={`
      block mb-3 font-semibold
      ${darkMode ? "text-white" : "text-black"}
    `}
          >
            Currency
          </label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={`
      w-full
      px-5
      py-4
      rounded-2xl
      outline-none
      border

      ${
        darkMode
          ? "bg-slate-800 border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }
    `}
          >
            <option value="INR">₹ INR</option>

            <option value="USD">$ USD</option>

            <option value="EUR">€ EUR</option>

            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* FINANCIAL GOAL */}

        <div className="mt-6">
          <label
            className={`
      block mb-3 font-semibold
      ${darkMode ? "text-white" : "text-black"}
    `}
          >
            Financial Goal
          </label>

          <select
            value={financialGoal}
            onChange={(e) => setFinancialGoal(e.target.value)}
            className={`
      w-full
      px-5
      py-4
      rounded-2xl
      outline-none
      border

      ${
        darkMode
          ? "bg-slate-800 border-white/10 text-white"
          : "bg-white border-gray-200 text-black"
      }
    `}
          >
            <option>Save More</option>

            <option>Reduce Expenses</option>

            <option>Build Emergency Fund</option>

            <option>Invest Better</option>
          </select>
        </div>

        {/* FORM */}

        <div className="space-y-6">
          {/* NAME */}

          <div>
            <p
              className={`mb-3 font-semibold ${
                darkMode ? "text-white" : "text-[#0f172a]"
              }`}
            >
              Full Name
            </p>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all ${
                darkMode
                  ? "bg-[#1f2937] border-white/10 text-white"
                  : "bg-gray-50 border-gray-200 text-black"
              }`}
            />
          </div>

          {/* BALANCE */}

          <div>
            <p
              className={`mb-3 font-semibold ${
                darkMode ? "text-white" : "text-[#0f172a]"
              }`}
            >
              Initial Balance
            </p>

            <input
              type="number"
              placeholder="₹50,000"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all ${
                darkMode
                  ? "bg-[#1f2937] border-white/10 text-white"
                  : "bg-gray-50 border-gray-200 text-black"
              }`}
            />
          </div>

          {/* MONTHLY BUDGET */}

          <div>
            <p
              className={`mb-3 font-semibold ${
                darkMode ? "text-white" : "text-[#0f172a]"
              }`}
            >
              Monthly Budget
            </p>

            <input
              type="number"
              placeholder="₹20,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl outline-none border transition-all ${
                darkMode
                  ? "bg-[#1f2937] border-white/10 text-white"
                  : "bg-gray-50 border-gray-200 text-black"
              }`}
            />
          </div>
        </div>

        {/* BUTTON */}

        <button
          onClick={handleContinue}
          className="
            mt-10
            w-full
            py-5
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-purple-700
            text-white
            text-lg
            font-semibold
            hover:scale-[1.02]
            transition-all
            duration-300
          "
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
