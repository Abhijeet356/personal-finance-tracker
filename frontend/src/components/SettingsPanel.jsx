"use client";

import { FaUser, FaMoon, FaLock, FaSave } from "react-icons/fa";

import { useTheme } from "@/context/ThemeContext";

import { useUser } from "@/context/UserContext";

export default function SettingsPanel() {
  const { darkMode, setDarkMode } = useTheme();

  const { userData } = useUser();

  return (
    <div
      className={`
        rounded-3xl
        shadow-xl
        p-8
        transition-all
        duration-300

        ${darkMode ? "bg-slate-900 text-white" : "bg-white text-black"}
      `}
    >
      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-violet-600 p-4 rounded-2xl text-white text-2xl shadow-lg">
          <FaUser />
        </div>

        <div>
          <h1
            className={`
              text-4xl
              font-bold

              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            Settings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      {/* USER PROFILE */}

      <div
        className={`
          mb-10
          rounded-3xl
          p-6
          flex
          items-center
          gap-5
          border
          transition-all
          duration-300

          ${
            darkMode
              ? "bg-slate-800 border-white/10"
              : "bg-slate-50 border-gray-200"
          }
        `}
      >
        {/* AVATAR */}

        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt="avatar"
            className="
              w-24
              h-24
              rounded-full
              object-cover
              shadow-lg
            "
          />
        ) : (
          <div
            className="
              w-24
              h-24
              rounded-full

              bg-gradient-to-br
              from-violet-500
              to-purple-600

              flex
              items-center
              justify-center

              text-white
              text-4xl
              font-bold

              shadow-lg
            "
          >
            {userData?.name ? userData.name[0] : "U"}
          </div>
        )}

        {/* USER INFO */}

        <div>
          <h2
            className={`
              text-3xl
              font-bold

              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            {userData?.name || "User"}
          </h2>

          <p className="text-gray-500 mt-2">Personal Finance Tracker User</p>
        </div>
      </div>

      {/* PROFILE DETAILS */}

      <div className="grid md:grid-cols-2 gap-6">
        {/* NAME */}

        <div>
          <label
            className={`
              font-semibold

              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            Full Name
          </label>

          <input
            type="text"
            value={userData?.name || ""}
            readOnly
            className={`
              w-full
              mt-2
              px-5
              py-4
              rounded-2xl
              outline-none
              border
              transition-all

              ${
                darkMode
                  ? "bg-slate-800 border-white/10 text-white"
                  : "bg-white border-gray-200 text-black"
              }
            `}
          />
        </div>

        {/* EMAIL */}

        <div>
          <label
            className={`
              font-semibold

              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@gmail.com"
            className={`
              w-full
              mt-2
              px-5
              py-4
              rounded-2xl
              outline-none
              border
              transition-all

              ${
                darkMode
                  ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-black"
              }
            `}
          />
        </div>
      </div>

      {/* SECURITY */}

      <div className="mt-10">
        <h2
          className={`
            text-2xl
            font-bold
            flex
            items-center
            gap-3
            mb-5

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          <FaLock />
          Security
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="password"
            placeholder="New Password"
            className={`
              w-full
              px-5
              py-4
              rounded-2xl
              outline-none
              border
              transition-all

              ${
                darkMode
                  ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-black"
              }
            `}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={`
              w-full
              px-5
              py-4
              rounded-2xl
              outline-none
              border
              transition-all

              ${
                darkMode
                  ? "bg-slate-800 border-white/10 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-black"
              }
            `}
          />
        </div>
      </div>

      {/* NOTIFICATIONS */}

      <div className="mt-10">
        <h2
          className={`
            text-2xl
            font-bold
            mb-5

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          Notifications
        </h2>

        <div className="space-y-4">
          {/* EMAIL NOTIFICATION */}

          <div
            className={`
              flex
              items-center
              justify-between
              p-5
              rounded-2xl
              transition-all

              ${darkMode ? "bg-slate-800" : "bg-slate-100"}
            `}
          >
            <span className={darkMode ? "text-white" : "text-black"}>
              Email Notifications
            </span>

            <input type="checkbox" className="w-5 h-5 accent-violet-600" />
          </div>

          {/* REPORTS */}

          <div
            className={`
              flex
              items-center
              justify-between
              p-5
              rounded-2xl
              transition-all

              ${darkMode ? "bg-slate-800" : "bg-slate-100"}
            `}
          >
            <span className={darkMode ? "text-white" : "text-black"}>
              Monthly Reports
            </span>

            <input type="checkbox" className="w-5 h-5 accent-violet-600" />
          </div>
        </div>
      </div>

      {/* APPEARANCE */}

      <div className="mt-10">
        <h2
          className={`
            text-2xl
            font-bold
            flex
            items-center
            gap-3
            mb-5

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          <FaMoon />
          Appearance
        </h2>

        <div
          className={`
            p-5
            rounded-2xl
            flex
            justify-between
            items-center

            ${darkMode ? "bg-slate-800" : "bg-slate-100"}
          `}
        >
          <span className={darkMode ? "text-white" : "text-black"}>
            Dark Mode
          </span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              bg-violet-600
              text-white
              px-5
              py-2
              rounded-xl
              hover:bg-violet-700
              hover:scale-105
              transition-all
              duration-300
            "
          >
            {darkMode ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}

      <div className="mt-10">
        <button
          className="
            flex
            items-center
            gap-3

            px-8
            py-4

            rounded-2xl

            bg-gradient-to-r
            from-violet-600
            to-purple-700

            text-white
            text-lg
            font-semibold

            hover:scale-[1.03]
            hover:shadow-[0_15px_40px_rgba(168,85,247,0.45)]

            transition-all
            duration-300
          "
        >
          <FaSave />
          Save Changes
        </button>
      </div>
    </div>
  );
}
