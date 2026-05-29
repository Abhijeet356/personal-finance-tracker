"use client";

import { useState } from "react";

export default function BalanceModal({ setBalance, closeModal }) {
  const [amount, setAmount] = useState("");
  const saveBalance = () => {
    const finalAmount = Number(amount);
    localStorage.setItem("balance", amount);
    localStorage.setItem("savings", amount);
    localStorage.setItem("income", 0);
    localStorage.setItem("expenses", 0);
    setBalance(finalAmount);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-[400px] shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Enter Total Balance
        </h1>

        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />

        <button onClick={saveBalance} className="btn btn-primary w-full mt-6">
          Save Balance
        </button>
      </div>
    </div>
  );
}
