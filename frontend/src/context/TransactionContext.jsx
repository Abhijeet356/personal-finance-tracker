"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filterType, setFilterType] = useState("all");

  const [filterCategory, setFilterCategory] = useState("all");

  const [paymentMode, setPaymentMode] = useState("all");

  const [sortBy, setSortBy] = useState("newest");

  const [searchQuery, setSearchQuery] = useState("");

  // LOAD

  useEffect(() => {
    const saved = localStorage.getItem("transactions");

    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  // SAVE

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // FILTERS

  let filteredTransactions = [...transactions];

  // TYPE

  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.type === filterType,
    );
  }

  // CATEGORY

  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.category === filterCategory,
    );
  }

  // PAYMENT MODE

  if (paymentMode !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.paymentMode === paymentMode,
    );
  }

  // SEARCH

  if (searchQuery.trim() !== "") {
    filteredTransactions = filteredTransactions.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.paymentMethod?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // SORT

  if (sortBy === "newest") {
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (sortBy === "oldest") {
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  if (sortBy === "highest") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "lowest") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  // ADD TRANSACTION

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,

        filteredTransactions,

        showFilters,
        setShowFilters,

        isModalOpen,
        setIsModalOpen,

        filterType,
        setFilterType,

        filterCategory,
        setFilterCategory,

        paymentMode,
        setPaymentMode,

        sortBy,
        setSortBy,

        searchQuery,
        setSearchQuery,

        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);
