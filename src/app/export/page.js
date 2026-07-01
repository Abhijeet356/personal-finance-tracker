"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { exportPDF, exportCSV, exportExcel, exportAnalyticsReport } from "@/utils/exportUtils";
import { useNotifications } from "@/context/NotificationContext";
import { motion } from "framer-motion";
import {FaFilePdf,FaFileCsv,FaFileExcel,FaChartPie,FaDownload,FaChevronRight,FaCheckCircle,FaLayerGroup,} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTransactions } from "@/context/TransactionContext";
import { useUser } from "@/context/UserContext";
import AddTransactionModal from "@/components/AddTransactionModal";
export default function ExportPage() {
  const { darkMode } = useTheme();
  const { addNotification } = useNotifications();
  const {
    transactions,
    filteredTransactions,
    showFilters,
    setShowFilters,
    isModalOpen,
    setIsModalOpen,
    addTransaction,
  } = useTransactions();

  const { userData } = useUser();
  const exportCards = [
    {
      title: "Export PDF",
      description: "Download financial report as PDF",
      icon: <FaFilePdf />,
      iconBg: "from-red-500 to-rose-600",
      leftBorder: "border-l-red-500",
      button: "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-[0_12px_28px_rgba(239,68,68,0.28)]",
      action: () => {
        exportPDF(transactions, userData?.currentBalance || 0);
        addNotification({
          title: "PDF Exported",
          message: "Financial PDF report downloaded successfully.",
        });
      },
    },

    {
      title: "Export CSV",
      description: "Export transactions as CSV spreadsheet",
      icon: <FaFileCsv />,
      iconBg: "from-emerald-500 to-green-600",
      leftBorder: "border-l-emerald-500",
      button: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-[0_12px_28px_rgba(16,185,129,0.28)]",
      action: () => {
        exportCSV(transactions);
        addNotification({
          title: "CSV Exported",
          message: "Transactions exported as CSV successfully.",
        });
      },
    },

    {
      title: "Export Excel",
      description: "Download Excel workbook with analytics",
      icon: <FaFileExcel />,
      iconBg: "from-sky-500 to-blue-600",
      leftBorder: "border-l-sky-500",
      button: "bg-sky-500/10 text-sky-600 hover:bg-sky-500 hover:text-white hover:shadow-[0_12px_28px_rgba(14,165,233,0.28)]",
      action: () => {
        exportExcel(transactions);
        addNotification({
          title: "Excel Exported",
          message: "Financial Excel report downloaded successfully.",
        });
      },
    },

    {
      title: "Analytics Report",
      description: "Export complete analytics summary report",
      icon: <FaChartPie />,
      iconBg: "from-violet-600 to-purple-700",
      leftBorder: "border-l-violet-500",
      button: "bg-violet-500/10 text-violet-600 hover:bg-violet-600 hover:text-white hover:shadow-[0_12px_28px_rgba(124,58,237,0.28)]",
      action: () => {
        exportAnalyticsReport(transactions, userData?.currentBalance || 0, userData?.monthlyBudget || 0);
        addNotification({
          title: "Analytics Report Exported",
          message: "Analytics report downloaded successfully.",
        });
      },
    },
  ];
  const statCards = [
    {
      label: "Total Transactions",
      value: transactions.length.toLocaleString(),
      icon: <FaLayerGroup />,
      tone: "from-violet-600 to-purple-700",
      border: "border-l-violet-500",
    },
    {
      label: "Available Formats",
      value: "4",
      icon: <FaDownload />,
      tone: "from-sky-500 to-blue-600",
      border: "border-l-sky-500",
    },
    {
      label: "Export Ready",
      value: filteredTransactions.length > 0 ? "Ready" : "No Data",
      icon: <FaCheckCircle />,
      tone:
        filteredTransactions.length > 0
          ? "from-emerald-500 to-green-600"
          : "from-red-500 to-rose-600",
      border:
        filteredTransactions.length > 0 ? "border-l-emerald-500" : "border-l-red-500",
      valueClass:
        filteredTransactions.length > 0 ? "text-emerald-500" : "text-red-500",
    },
  ];

  return (
    <div
      className={`relative overflow-hidden flex min-h-screen ${
        darkMode ? "bg-[#0f172a]" : "bg-slate-100"
      }`}
    >
      {/* SIDEBAR */}

      <Sidebar
        openTransactionModal={() => setIsModalOpen(true)}
        toggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* MAIN */}
      <div className="flex-1 min-w-0 ml-[320px]">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-6 md:p-8"
        >
          {/* HEADER */}

          <div className="mb-8 md:mb-10">
            <h1
              className={`text-4xl font-black tracking-tight md:text-5xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Export Center
            </h1>

            <p
              className={`mt-3 text-lg ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Download your financial reports and analytics
            </p>
          </div>

          {/* STATS */}

          <div className="mb-10 grid gap-6 md:grid-cols-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-[22px] border border-l-4 ${stat.border} p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.14)] ${
                  darkMode
                    ? "border-white/10 bg-white/[0.06] text-white backdrop-blur-xl"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {stat.label}
                    </p>

                    <h2
                      className={`mt-4 text-4xl font-black ${
                        stat.valueClass || (darkMode ? "text-white" : "text-slate-950")
                      }`}
                    >
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone} text-xl text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EXPORT GRID */}
          <div className="grid gap-6 xl:grid-cols-2 xl:gap-8">
            {exportCards.map((card, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[22px] border border-l-4 ${card.leftBorder} p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.14)] md:p-7 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.06] text-white backdrop-blur-xl"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
              >
                <div className="grid min-h-[120px] grid-cols-[auto_1fr] gap-5 pr-0 sm:pr-40">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconBg} text-2xl text-white shadow-lg`}
                  >
                    {card.icon}
                  </div>

                  <div>
                    <h2
                      className={`text-2xl font-black ${
                        darkMode ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {card.title}
                    </h2>

                    <p
                      className={`mt-3 max-w-md text-base leading-7 ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end sm:absolute sm:right-7 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
                  <button
                    onClick={card.action}
                    className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-black transition-all duration-300 ${card.button}`}
                  >
                    <FaDownload className="text-sm" />
                    <span>Export</span>
                    <FaChevronRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <AddTransactionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={(transaction, currentBalance) => {
                addTransaction(transaction);
                addNotification({
                  title: "Transaction Added",
                  message: `${transaction.category} transaction of ₹${transaction.amount} added successfully.`,
                  type: "transaction",
                });
                setIsModalOpen(false);
              }}
            />
    </div>
  );
}
