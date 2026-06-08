"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";
import { useUser } from "@/context/UserContext";
import {FaUser,FaMoneyBillWave,FaPiggyBank,FaWallet,FaChartPie,} from "react-icons/fa6";

export default function SetupPage() {
  const router = useRouter();
  const { setUserData } = useUser();
  const { darkMode } = useTheme();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me");

        if (res.data.user.onboardingComplete) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUser();
  }, []);

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
      setUserData(userData);
      window.location.href = "/dashboard";
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
          : "bg-gradient-to-br from-violet-50 via-white to-blue-50"
      }`}
    >
      <div
        className={`w-full max-w-5xl rounded-[32px] p-10 md:p-12 shadow-[0_30px_80px_rgba(139,92,246,0.15)] border backdrop-blur-xl relative overflow-hidden ${
          darkMode
            ? "bg-slate-900/90 border-white/10"
            : "bg-white border-violet-100"
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          {/* HEADING */}

          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="text-5xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent">
                {" "}
                SpendSense
              </div>
            </div>

            <h1
              className={`text-5xl font-bold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Welcome to SpendSense ✨
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Let's personalize your finance workspace
            </p>
          </div>

          {/* AVATAR CARD */}

          <div
            className={`rounded-3xl border p-6 mb-8 flex flex-col md:flex-row items-center gap-6 ${
              darkMode
                ? "bg-gradient-to-r from-violet-950/30 to-slate-900 border-white/10"
                : "bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 border-violet-300"
            }`}
          >
            <div
              className={`w-32 h-32 rounded-full overflow-hidden border-4 shadow-[0_20px_60px_rgba(168,85,247,0.45)] ${
                darkMode ? "border-violet-500/30" : "border-violet-200"
              }`}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                  {name ? name[0].toUpperCase() : "A"}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Upload Profile Picture
              </h3>

              <p className="text-gray-500 mt-2">
                Add a profile picture to personalize your account
              </p>

              <label className="inline-block mt-4 px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold cursor-pointer hover:bg-violet-800 transition">
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* CURRENCY AND FINANCIAL GOAL */}

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label
                className={`block mb-3 font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-300 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 ${
                  darkMode
                    ? "bg-slate-800 border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }`}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>

            <div>
              <label
                className={`block mb-3 font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Financial Goal
              </label>

              <select
                value={financialGoal}
                onChange={(e) => setFinancialGoal(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-300 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 ${
                  darkMode
                    ? "bg-slate-800 border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }`}
              >
                <option>Save More</option>
                <option>Reduce Expenses</option>
                <option>Build Emergency Fund</option>
                <option>Invest Better</option>
              </select>
            </div>
          </div>
          {/* FORM */}

          {/* FORM */}

          <div
            className={`rounded-3xl p-8 mt-4 mb-6 ${
              darkMode
                ? "bg-slate-800/30 border border-white/10"
                : "bg-gradient-to-br from-violet-200 via-white to-indigo-200 border border-violet-100"
            }`}
          >
            <div className="space-y-4">
              {/* NAME */}

              <div>
                <p
                  className={`mb-3 font-semibold ${
                    darkMode ? "text-white" : "text-[#0f172a]"
                  }`}
                >
                  <FaUser className="inline-block mr-2 text-violet-500" />
                  Full Name
                </p>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-400 focus:ring-4 focus:ring-violet-500/15 focus:border-violet-500 ${
                    darkMode
                      ? "bg-[#1f2937] border-white/10 text-white"
                      : "bg-white border-slate-200 text-black shadow-sm"
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
                  <FaMoneyBillWave className="inline-block mr-2 text-green-500" />
                  Initial Balance
                </p>

                <input
                  type="number"
                  placeholder="₹50,000"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-300 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 ${
                    darkMode
                      ? "bg-[#1f2937] border-white/10 text-white"
                      : "bg-white border-slate-200 text-black shadow-sm"
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
                  <FaMoneyBillWave className="inline-block mr-2 text-green-500" />
                  Monthly Salary
                </p>

                <input
                  type="number"
                  placeholder="₹50,000"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-300 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 ${
                    darkMode
                      ? "bg-[#1f2937] border-white/10 text-white"
                      : "bg-white border-slate-200 text-black shadow-sm"
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
                  <FaChartPie className="inline-block mr-2 text-purple-500" />
                  Monthly Budget
                </p>

                <input
                  type="number"
                  placeholder="₹20,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl outline-none border hover:border-violet-300 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 ${
                    darkMode
                      ? "bg-[#1f2937] border-white/10 text-white"
                      : "bg-white border-slate-200 text-black shadow-sm"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* PREVIEW */}

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
              Finanicial Snapshot
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div
                className={`rounded-2xl p-4 border ${
                  darkMode
                    ? "bg-blue-900/20 border-blue-500/30"
                    : "bg-gradient-to-br from-blue-200 to-cyan-400 text-white"
                }`}
              >
                <p className="text-xs text-black">BALANCE</p>

                <p
                  className={`text-2xl font-bold mt-2 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  ₹{balance || 0}
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 border ${
                  darkMode
                    ? "bg-green-900/20 border-green-500/30"
                    : "bg-gradient-to-br from-emerald-200 to-green-300 text-white"
                }`}
              >
                <p className="text-xs text-black">SALARY</p>

                <p
                  className={`text-2xl font-bold mt-2 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  ₹{salary || 0}
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 border ${
                  darkMode
                    ? "bg-purple-900/20 border-purple-500/30"
                    : "bg-gradient-to-br from-orange-200 to-amber-300 text-white"
                }`}
              >
                <p className="text-xs text-black">BUDGET</p>

                <p
                  className={`text-2xl font-bold mt-2 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  ₹{budget || 0}
                </p>
              </div>
            </div>
          </div>
          {/* BUTTON */}

          <button
            onClick={handleContinue}
            className="mt-10 w-full py-5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500
            text-2xl text-white font-bold hover:scale-[1.02]
            shadow-[0_15px_50px_rgba(168,85,247,0.45)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.6)] rounded-3xl
            hover:-translate-y-1 active:scale-95 tracking-wide transition-all duration-300"
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
