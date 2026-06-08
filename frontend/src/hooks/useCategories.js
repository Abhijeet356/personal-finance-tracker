"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

const fallbackCategories = [
  { name: "Bills", type: "expense", color: "#EF4444" },
  { name: "Entertainment", type: "expense", color: "#8B5CF6" },
  { name: "Food", type: "expense", color: "#F97316" },
  { name: "Health", type: "expense", color: "#22C55E" },
  { name: "Other Expense", type: "expense", color: "#64748B" },
  { name: "Rent", type: "expense", color: "#0EA5E9" },
  { name: "Shopping", type: "expense", color: "#EC4899" },
  { name: "Transport", type: "expense", color: "#6366F1" },
  { name: "Salary", type: "income", color: "#22C55E" },
  { name: "Freelance", type: "income", color: "#0EA5E9" },
  { name: "Other Income", type: "income", color: "#64748B" },
];

const mergeCategories = (apiCategories = []) => {
  const categoryMap = new Map();

  [...fallbackCategories, ...apiCategories].forEach((category) => {
    categoryMap.set(`${category.type}-${category.name}`, category);
  });

  return Array.from(categoryMap.values());
};

export default function useCategories() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(false);
  const refreshCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories");
      setCategories(mergeCategories(response.data.categories));
    } catch (error) {
      console.error("Failed to load categories", error);
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(refreshCategories);
  }, [refreshCategories]);

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.type === "expense"),
    [categories],
  );

  const incomeCategories = useMemo(
    () => categories.filter((category) => category.type === "income"),
    [categories],
  );

  return {
    categories,
    expenseCategories,
    incomeCategories,
    loading,
    refreshCategories,
  };
}
