"use client";

import { useState } from "react";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaBullseye,
  FaCoins,
  FaCamera,
} from "react-icons/fa";

import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/context/NotificationContext";

import { useUser } from "@/context/UserContext";

export default function ProfileModal({ isOpen, closeModal }) {
  const { darkMode } = useTheme();

  const { addNotification } = useNotifications();

  const { userData, setUserData } = useUser();

  const [name, setName] = useState(userData?.name || "");

  const [email, setEmail] = useState(userData?.email || "");

  const [currency, setCurrency] = useState(userData?.currency || "INR");

  const [financialGoal, setFinancialGoal] = useState(
    userData?.financialGoal || "Save More",
  );

  const [avatar, setAvatar] = useState(userData?.avatar || null);

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

  // SAVE

  const handleSave = () => {
    const updatedUser = {
      ...userData,

      name,

      email,

      currency,

      financialGoal,

      avatar,
    };

    // UPDATE CONTEXT

    setUserData(updatedUser);

    // SAVE LOCALSTORAGE

    localStorage.setItem(
      "user_setup",

      JSON.stringify(updatedUser),
    );

    addNotification({
      title: "Profile Updated",

      message: "Your profile information was updated successfully.",
    });

    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        className={`w-full max-w-2xl rounded-[36px] p-8 shadow-2xl border relative transition-all duration-300 ${
          darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-white border-slate-200"
        }`}
      >
        {/* CLOSE */}

        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        {/* HEADER */}

        <h1
          className={`text-4xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Edit Profile
        </h1>

        <p className={`mt-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Personalize your finance experience
        </p>

        {/* AVATAR */}

        <div className="flex flex-col items-center mt-10">
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
                {name ? name[0] : "U"}
              </div>
            )}
          </div>

          <label className="mt-5 cursor-pointer text-violet-500 font-semibold flex items-center gap-2">
            <FaCamera />
            Change Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* FORM */}

        <div className="mt-10 space-y-6">
          {/* NAME */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Full Name
            </label>

            <div className="relative mt-3">
              <FaUser className="absolute top-5 left-5 text-slate-400" />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Email Address
            </label>

            <div className="relative mt-3">
              <FaEnvelope className="absolute top-5 left-5 text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              />
            </div>
          </div>

          {/* CURRENCY */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Currency
            </label>

            <div className="relative mt-3">
              <FaCoins className="absolute top-5 left-5 text-slate-400" />

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              >
                <option value="INR">₹ INR</option>

                <option value="USD">$ USD</option>

                <option value="EUR">€ EUR</option>

                <option value="GBP">£ GBP</option>
              </select>
            </div>
          </div>

          {/* GOAL */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Financial Goal
            </label>

            <div className="relative mt-3">
              <FaBullseye className="absolute top-5 left-5 text-slate-400" />

              <select
                value={financialGoal}
                onChange={(e) => setFinancialGoal(e.target.value)}
                className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-slate-100 border-slate-300 text-black"
                }`}
              >
                <option>Save More</option>

                <option>Reduce Expenses</option>

                <option>Build Emergency Fund</option>

                <option>Invest Better</option>
              </select>
            </div>
          </div>

          {/* MEMBER SINCE */}

          <div>
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Member Since
            </label>

            <input
              type="text"
              value={userData?.memberSince || ""}
              readOnly
              className={`w-full mt-3 px-5 py-4 rounded-2xl border-2 outline-none ${
                darkMode
                  ? "bg-slate-800 border-slate-600 text-slate-300"
                  : "bg-slate-100 border-slate-300 text-slate-600"
              }`}
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={closeModal}
            className="px-8 py-4 rounded-2xl bg-slate-500 text-white font-semibold hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
