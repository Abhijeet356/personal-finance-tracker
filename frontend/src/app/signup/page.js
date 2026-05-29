"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaApple, FaUser } from "react-icons/fa";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const handleSignup = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        name: Name,
        email,
        password,
      });

      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if (response.data.user.onboardingComplete) {
        router.push("/dashboard");
      } else {
        router.push("/setup");
      }
    } catch (error) {
      console.error("Signup error:", error);

      alert(error?.response?.data?.message || error.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-700 flex items-center justify-center p-10">
      <div className="w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
        {/* LEFT SIDE */}

        <div className="relative min-h-[700px] bg-[#050816] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-700/20 z-0" />

          <img
            src="/images/bg-main.png"
            alt="SpendSense"
            className="
            relative z-10
            w-[115%]
            max-w-none
            object-cover
            object-center
          "
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white px-16 py-14 flex flex-col justify-center">
          {/* HEADING */}

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl leading-tight font-bold text-black mb-3"
          >
            Create{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              Account
            </span>
            ✨
          </motion.h1>

          <p className="text-gray-500 text-lg mb-8">
            Start managing your finances smartly
          </p>

          {/* FULL NAME */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-5">
            <FaUser className="text-gray-400 text-lg mr-4" />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none text-black"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-5">
            <FaEnvelope className="text-gray-400 text-lg mr-4" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-5">
            <FaLock className="text-gray-400 text-lg mr-4" />

            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-6">
            <FaLock className="text-gray-400 text-lg mr-4" />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* TERMS */}

          <div className="flex items-center gap-3 mb-7">
            <input
              type="checkbox"
              className="accent-violet-600 w-4 h-4"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />

            <span className="text-gray-600 text-sm">
              I agree to Terms & Conditions
            </span>
          </div>

          {/* SIGNUP BUTTON */}

          <button
            onClick={handleSignup}
            className="
      w-full py-4 rounded-2xl
      bg-gradient-to-r from-fuchsia-600 via-purple-600 to-violet-500
      text-white text-xl font-semibold
      flex items-center justify-center gap-3
      shadow-[0_10px_30px_rgba(168,85,247,0.45)]
      hover:scale-[1.02]
      hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)]
      transition-all duration-300
    "
          >
            Sign Up
          </button>

          {/* DIVIDER */}

          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-4 text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* GOOGLE */}

          <button className="w-full border border-gray-300 bg-white rounded-2xl py-4 flex items-center justify-center gap-4 mb-4 hover:bg-gray-200 transition shadow-sm">
            <FaGoogle className="text-red-500 text-xl" />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          {/* APPLE */}

          <button className="w-full border border-gray-300 bg-white rounded-2xl py-4 flex items-center justify-center gap-4 hover:bg-gray-200 transition shadow-sm">
            <FaApple className="text-black text-xl" />

            <span className="font-medium text-gray-700">
              Continue with Apple
            </span>
          </button>

          {/* LOGIN */}

          <div className="text-center mt-8 text-gray-600 text-lg">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-violet-600 font-semibold hover:underline inline-flex items-center gap-2"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
