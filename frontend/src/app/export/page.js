"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { exportPDF, exportCSV, exportExcel, exportAnalyticsReport } from "@/utils/exportUtils";
import { useNotifications } from "@/context/NotificationContext";
import {
  FaFilePdf,
  FaFileCsv,
  FaFileExcel,
  FaChartPie,
  FaDownload,
} from "react-icons/fa";
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

      gradient: "from-red-500 to-pink-600",
      accent: "text-red-500 border-red-500 hover:bg-red-50",
      iconBg: "bg-red-500",

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

      gradient: "from-green-500 to-emerald-600",
      accent: "text-emerald-600 border-emerald-600 hover:bg-emerald-50",
      iconBg: "bg-emerald-600",

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

      gradient: "from-blue-500 to-cyan-600",
      accent: "text-sky-600 border-sky-600 hover:bg-sky-50",
      iconBg: "bg-sky-600",

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

      gradient: "from-violet-600 to-purple-700",
      accent: "text-violet-600 border-violet-600 hover:bg-violet-50",
      iconBg: "bg-violet-600",

      action: () => {
        exportAnalyticsReport(transactions, userData?.currentBalance || 0, userData?.monthlyBudget || 0);

        addNotification({
          title: "Analytics Report Exported",
          message: "Analytics report downloaded successfully.",
        });
      },
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

        <div className="p-6 md:p-8">
          {/* HEADER */}

          <div className="mb-10">
            <h1
              className={`text-5xl font-bold ${
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

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div
              className={`app-surface p-6 ${
                darkMode ? "app-surface-dark" : "app-surface-light"
              }`}
            >
              <p className="text-slate-500">Total Transactions</p>

              <h1
                className={`text-4xl font-bold mt-3 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {transactions.length}
              </h1>
            </div>

            <div
              className={`app-surface p-6 ${
                darkMode ? "app-surface-dark" : "app-surface-light"
              }`}
            >
              <p className="text-slate-500">Available Formats</p>

              <h1
                className={`text-4xl font-bold mt-3 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                4
              </h1>
            </div>

            <div
              className={`app-surface p-6 ${
                darkMode ? "app-surface-dark" : "app-surface-light"
              }`}
            >
              <p className="text-slate-500">Export Ready</p>

              <h1
                className={`text-4xl font-bold mt-3 ${
                  filteredTransactions.length > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {filteredTransactions.length > 0 ? "Ready" : "No Data"}
              </h1>
            </div>
          </div>

          {/* EXPORT GRID */}

          <div className="grid xl:grid-cols-2 gap-8">
            {exportCards.map((card, index) => (
              <div
                key={index}
                className={`app-surface relative overflow-hidden p-8 ${
                  darkMode ? "app-surface-dark" : "app-surface-light"
                }`}
              >
                {/* ICON */}

                <div
                  className={`w-20 h-20 rounded-3xl ${card.iconBg} text-white text-4xl flex items-center justify-center shadow-lg`}
                >
                  {card.icon}
                </div>

                {/* TEXT */}

                <h2
                  className={`mt-8 text-3xl font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {card.title}
                </h2>

                <p
                  className={`mt-4 text-lg leading-relaxed ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>

                {/* BUTTON */}

                {/* ACTION BUTTON */}

                <div className="absolute top-8 right-8">
                  <button
                    onClick={card.action}
                    className={`
      w-24
      h-24

      border-2

      flex
      flex-col
      items-center
      justify-center
      gap-3

      transition-all
      duration-300

      ${card.accent}
    `}
                  >
                    <FaDownload className="text-2xl" />

                    <span className="font-bold text-lg">Export</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
