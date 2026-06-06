"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await api.get("/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Failed to load transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  // SAVE

  // FILTERS

  let filteredTransactions = [...transactions];

  // TYPE

  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.type === filterType,
    );
  }
  // DATE FILTER

  const today = new Date();

  if (dateFilter === "today") {
    filteredTransactions = filteredTransactions.filter((item) => {
      const date = new Date(item.date);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
  }

  if (dateFilter === "week") {
    const weekStart = new Date(today);

    weekStart.setDate(today.getDate() - today.getDay());

    filteredTransactions = filteredTransactions.filter((item) => {
      return new Date(item.date) >= weekStart;
    });
  }

  if (dateFilter === "month") {
    filteredTransactions = filteredTransactions.filter((item) => {
      const date = new Date(item.date);

      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
  }
  // CATEGORY

  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.category === filterCategory,
    );
  }

  // PAYMENT METHOD

  if (paymentMethod !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (item) => item.paymentMethod === paymentMethod,
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

        paymentMethod,
        setPaymentMethod,

        sortBy,
        setSortBy,

        searchQuery,
        setSearchQuery,

        addTransaction,

        dateFilter,
        setDateFilter,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);
