"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      if (response.data.user.onboardingComplete) {
        router.push("/dashboard");
      } else {
        router.push("/setup");
      }
    } catch (error) {
      console.log(error);

      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-700 flex items-center justify-center p-10">
      <div className="w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
        {/* LEFT SIDE */}

        <div className="relative min-h-[700px] bg-[#050816] flex items-center justify-center overflow-hidden">
          {/* Background Glow */}

          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-700/20 z-0" />

          {/* IMAGE */}

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
          {/* TOP TOGGLE */}

          <div className="flex justify-end mb-8">
            <div className="flex items-center border rounded-xl p-1 shadow-sm"></div>
          </div>

          {/* HEADING */}

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl leading-tight font-bold text-black mb-3"
          >
            Welcome{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              Back!
            </span>
            👋
          </motion.h1>

          <p className="text-gray-500 text-lg mb-10">
            Login to continue your finance journey
          </p>

          {/* EMAIL LABEL */}

          <label className="font-semibold text-gray-700 mb-3">
            Email Address
          </label>

          {/* EMAIL INPUT */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-8">
            <FaEnvelope className="text-gray-400 text-lg mr-4" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD LABEL */}

          <label className="font-semibold text-gray-700 mb-3">Password</label>

          {/* PASSWORD INPUT */}

          <div className="flex items-center border border-gray-300 shadow-sm rounded-2xl px-5 py-4 mb-6">
            <FaLock className="text-gray-400 text-lg mr-4" />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none text-black "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* REMEMBER + FORGOT */}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="accent-violet-600 w-4 h-4" />

              <span className="text-gray-600">Remember me</span>
            </div>

            <button className="text-violet-600 font-medium hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={handleLogin}
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
            Login
          </button>

          {/* DIVIDER */}

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-4 text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* GOOGLE */}

          <button className="w-full border border-gray-300 bg-white rounded-2xl py-4 flex items-center justify-center gap-4 mb-5 hover:bg-gray-200 transition shadow-sm">
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

          {/* CREATE ACCOUNT */}

          <div className="text-center mt-10 text-gray-600 text-lg">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-violet-600 font-semibold hover:underline inline-flex items-center gap-2"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
