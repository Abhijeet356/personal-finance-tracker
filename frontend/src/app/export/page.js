"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { exportPDF, exportCSV, exportExcel, exportAnalyticsReport } from "@/utils/exportUtils";
import { useNotifications } from "@/context/NotificationContext";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaChartPie } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTransactions } from "@/context/TransactionContext";
import { useUser } from "@/context/UserContext";
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
  } = useTransactions();

  const { userData } = useUser();

  const exportCards = [
    {
      title: "Export PDF",

      description: "Download financial report as PDF",

      icon: <FaFilePdf />,

      gradient: "from-red-500 to-pink-600",

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
      {/* BACKGROUND GLOWS */}

      <div className="absolute top-20 left-20 w-[350px] h-[350px] bg-violet-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full" />

      {/* SIDEBAR */}

      <Sidebar
        openTransactionModal={() => setIsModalOpen(true)}
        toggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* MAIN */}

      <div className="flex-1 min-w-0 ml-[260px]">
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
              className={`p-6 rounded-[28px] shadow-xl ${
                darkMode ? "bg-white/5 border border-white/10" : "bg-white"
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
              className={`p-6 rounded-[28px] shadow-xl ${
                darkMode ? "bg-white/5 border border-white/10" : "bg-white"
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
              className={`p-6 rounded-[28px] shadow-xl ${
                darkMode ? "bg-white/5 border border-white/10" : "bg-white"
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
                className={`group relative overflow-hidden rounded-[36px] p-8 border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/70 border-white"
                }`}
              >
                {/* GLOW */}

                <div
                  className={`absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br ${card.gradient} opacity-40 rounded-full blur-[90px] group-hover:scale-125 transition-all duration-700`}
                />

                {/* SHINE EFFECT */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full" />

                {/* ICON */}

                <div
                  className={`w-24 h-24 rounded-[30px] bg-gradient-to-br ${card.gradient} text-white text-5xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.25)] group-hover:rotate-6 transition-all duration-500`}
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
      w-28
      h-28

      rounded-[28px]

      border-2

      flex
      flex-col
      items-center
      justify-center
      gap-3

      transition-all
      duration-300

      hover:scale-105
      hover:shadow-xl

      ${
        card.title === "Export PDF"
          ? "border-red-500 text-red-500 hover:bg-red-50"
          : card.title === "Export CSV"
            ? "border-green-500 text-green-500 hover:bg-green-50"
            : card.title === "Export Excel"
              ? "border-blue-500 text-blue-500 hover:bg-blue-50"
              : "border-violet-500 text-violet-500 hover:bg-violet-50"
      }
    `}
                  >
                    <div className="text-3xl">⬇</div>

                    <span className="font-bold text-lg">Export</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
