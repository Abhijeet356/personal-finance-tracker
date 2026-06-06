"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartPie,
  FaCog,
  FaFileExport,
  FaFilter,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useTransactions } from "@/context/TransactionContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
export default function Sidebar({
  openTransactionModal,
  toggleFilters,
  showFilters,
  setShowFilters,
}) {
  const {
    transactions,
    setFilterCategory,
    setFilterType,
    setPaymentMethod,
    setSortBy,
    setSearchQuery,
  } = useTransactions();
  const { userData } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const resetFilters = useCallback(() => {
    setFilterCategory("all");
    setFilterType("all");
    setPaymentMethod("all");
    setSortBy("newest");
  }, [setFilterCategory, setFilterType, setPaymentMethod, setSortBy]);

  useEffect(() => {
    if (pathname !== "/dashboard" && showFilters) {
      resetFilters();
      setShowFilters(false);
    }
  }, [pathname, resetFilters, setShowFilters, showFilters]);

  const closeFilters = () => {
    setSearchQuery("");
  };

  const handleDashboardClick = () => {
    if (showFilters) {
      resetFilters();
      toggleFilters();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("transactions");
    localStorage.removeItem("budget_settings");
    localStorage.removeItem("notifications");

    window.location.href = "/";
  };

  const now = new Date();
  const currentMonthTransactions = transactions.filter((item) => {
    const transactionDate = new Date(item.date);

    return (
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear()
    );
  });
  const monthIncome = currentMonthTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);
  const monthExpense = currentMonthTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);
  const monthSavings = monthIncome - monthExpense;
  const monthlyBudget = Number(userData?.monthlyBudget || 0);
  const budgetUsed =
    monthlyBudget > 0 ? Math.min((monthExpense / monthlyBudget) * 100, 100) : 0;

  const formatAmount = (value) => `\u20b9${Math.round(value).toLocaleString()}`;

  const sections = [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          icon: FaHome,
          href: "/dashboard",
          active: pathname === "/dashboard" && !showFilters,
          onClick: handleDashboardClick,
        },
        {
          label: "Analytics",
          icon: FaChartPie,
          href: "/analytics",
          active: pathname === "/analytics" && !showFilters,
          onClick: closeFilters,
        },
      ],
    },
    {
      label: "Manage",
      items: [
        {
          label: "New Transaction",
          icon: FaPlusCircle,
          onClick: () => openTransactionModal?.(),
        },
        {
          label: "Sort & Filter",
          icon: FaFilter,
          active: pathname === "/dashboard" && showFilters,
          onClick: () => {
            setShowFilters(true);
            if (pathname !== "/dashboard") {
              router.push("/dashboard");
              return;
            }
          },
        },
      ],
    },
    {
      label: "Tools",
      items: [
        {
          label: "Export",
          icon: FaFileExport,
          href: "/export",
          active: pathname === "/export",
          onClick: closeFilters,
        },
      ],
    },
    {
      label: "System",
      items: [
        {
          label: "Settings",
          icon: FaCog,
          href: "/settings",
          active: pathname === "/settings",
          onClick: closeFilters,
        },
      ],
    },
  ];

  const navItemClass = (active) =>
    `group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_14px_34px_rgba(124,58,237,0.42)]"
        : "text-slate-300 hover:translate-x-1 hover:bg-white/[0.08] hover:text-white"
    }`;

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const content = (
      <>
        {item.active && (
          <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.95)]" />
        )}
        <Icon className="h-4 w-4 shrink-0" />
        <span>{item.label}</span>
      </>
    );

    if (item.href) {
      return (
        <Link key={item.label} href={item.href} onClick={item.onClick}>
          <div className={navItemClass(item.active)}>{content}</div>
        </Link>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        onClick={item.onClick}
        className={navItemClass(item.active)}
      >
        {content}
      </button>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[320px] flex-col overflow-hidden border-r border-violet-400/15 bg-[#030616] bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.26),transparent_28%),linear-gradient(180deg,#05091f_0%,#02030d_60%,#030012_100%)] text-white shadow-[22px_0_70px_rgba(2,6,23,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.28),transparent_62%)]" />

      <div className="relative flex min-h-0 flex-1 flex-col px-6 py-6">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/images/logo.png"
            alt="SpendSense logo"
            className="h-16 w-16 object-contain drop-shadow-[0_0_24px_rgba(139,92,246,0.55)]"
          />
          <p className="mt-1 text-sm font-bold tracking-tight text-white">
            SpendSense
          </p>
        </div>

        <nav className="space-y-6">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="mb-3 px-4 text-[11px] font-black uppercase tracking-[2px] text-violet-300/70">
                {section.label}
              </p>
              <div className="space-y-2">
                {section.items.map(renderNavItem)}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-7 rounded-2xl border border-cyan-300/10 bg-white/[0.04] p-5 shadow-[0_16px_38px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[2px] text-violet-300">
              This Month
            </p>
            <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">
              {Math.round(budgetUsed)}%
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>Income</span>
              <span className="font-bold text-emerald-300">
                {formatAmount(monthIncome)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Expense</span>
              <span className="font-bold text-red-300">
                {formatAmount(monthExpense)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Savings</span>
              <span className="font-bold text-violet-300">
                {formatAmount(monthSavings)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">
              <span>Budget Used</span>
              <span>{formatAmount(monthExpense)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${budgetUsed}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-2xl border border-red-400/20 bg-red-500/5 px-5 py-3.5 text-sm font-bold text-red-500 shadow-[0_14px_34px_rgba(127,29,29,0.16)] transition-all duration-300 hover:translate-x-1 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
          >
            <FaSignOutAlt className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
