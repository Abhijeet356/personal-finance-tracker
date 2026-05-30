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
import api from "@/lib/api";

export default function ProfileModal({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return <ProfileModalContent closeModal={closeModal} />;
}

function ProfileModalContent({ closeModal }) {
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

    if (file.size > 1500000) {
      alert("Please choose an image smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // SAVE

  const handleSave = async () => {
    try {
      const response = await api.patch("/auth/profile", {
        name,
        email,
        currency,
        financialGoal,
        avatar: avatar || "",
      });

      const updatedUser = response.data.user;

      setUserData(updatedUser);
      localStorage.setItem("user_setup", JSON.stringify(updatedUser));

      addNotification({
        title: "Profile Updated",

        message: "Your profile information was updated successfully.",
      });

      closeModal();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        className={`app-surface w-full max-w-2xl p-8 relative ${
          darkMode ? "app-surface-dark" : "app-surface-light"
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
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
                className={`app-field pl-14 ${
                  darkMode ? "app-field-dark" : "app-field-light"
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
              className={`app-field mt-3 ${
                darkMode
                  ? "app-field-dark text-slate-300"
                  : "app-field-light text-slate-600"
              }`}
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={closeModal}
            className={`app-button app-button-secondary px-8 py-4 ${
              darkMode ? "bg-white/10 text-white hover:bg-white/15" : ""
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="app-button app-button-primary px-8 py-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
