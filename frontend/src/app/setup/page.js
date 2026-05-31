"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import { useUser } from "@/context/UserContext";

export default function SetupPage() {
  const router = useRouter();
  const { setUserData } = useUser();
  const { darkMode } = useTheme();

  useEffect(() => {
    const existingUser = localStorage.getItem("user_setup");

    if (existingUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [salary, setSalary] = useState("");
  const [budget, setBudget] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [financialGoal, setFinancialGoal] = useState("Save More");

  // SAVE SETUP

  const handleContinue = async () => {
    if (!name || !balance || !budget || salary === "") {
      alert("Please fill all required fields.");

      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/auth/onboarding",

        {
          name,
          avatar: avatar || "",
          currency,
          financialGoal,
          currentBalance: Number(balance),
          monthlySalary: Number(salary),
          monthlyBudget: Number(budget),
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const userData = response.data.user;

      localStorage.setItem("user_setup", JSON.stringify(userData));

      setUserData(userData);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Setup failed");
    }
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
darkMode
  ? "bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950"
  : "bg-gradient-to-br from-slate-50 via-white to-slate-100"      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-[32px] p-10 md:p-12 shadow-2xl border backdrop-blur-xl ${
          darkMode
  ? "bg-slate-900/90 border-white/10"
  : "bg-white/90 border-gray-200"
        }`}
      >
        {/* HEADING */}

        <div className="text-center mb-10">
  <h1
    className={`text-6xl font-extrabold tracking-tight ${
      darkMode ? "text-white" : "text-slate-900"
    }`}
  >
    Welcome 👋
  </h1>

  <p className="text-gray-500 mt-4 text-xl">
    Set up your financial profile in less than a minute.
  </p>
</div>

        {/* AVATAR */}

        <div className="flex flex-col items-center mb-10">
          <div
            className={`w-32 h-32 rounded-full overflow-hidden border-4 shadow-xl ${
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

          <label className="mt-5 px-5 py-2 rounded-xl bg-violet-500/10 text-violet-500 font-semibold cursor-pointer hover:bg-violet-500/20 transition">
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

          {/* MONTHLY SALARY */}

          <div>
            <p
              className={`mb-3 font-semibold ${
                darkMode ? "text-white" : "text-[#0f172a]"
              }`}
            >
              Monthly Salary
            </p>

            <input
              type="number"
              placeholder="₹50,000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
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

<div
  className={`rounded-2xl p-5 border mt-4 ${
    darkMode
      ? "bg-slate-800 border-white/10"
      : "bg-slate-50 border-gray-200"
  }`}
>
  <h3
    className={`font-semibold mb-4 ${
      darkMode ? "text-white" : "text-slate-900"
    }`}
  >
    Preview
  </h3>

  <div className="flex justify-between text-gray-500">
    <span>Monthly Salary</span>
    <span>₹{salary || 0}</span>
  </div>

  <div className="flex justify-between text-gray-500 mt-2">
    <span>Monthly Budget</span>
    <span>₹{budget || 0}</span>
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
    to-purple-600
    text-white
    text-lg
    font-bold
    shadow-lg
    hover:shadow-violet-500/30
    hover:scale-[1.02]
    transition-all
    duration-300
  "
>
   Launch Dashboard
</button>
      </div>
    </div>
  );
}
