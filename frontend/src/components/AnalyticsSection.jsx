"use client";

import TrendChart from "./charts/TrendChart";
import ExpensePieChart from "./charts/ExpensePieChart";

export default function AnalyticsSection({ transactions }) {
  // CURRENT MONTH

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  // FILTER CURRENT MONTH TRANSACTIONS

 const monthlyTransactions = transactions.filter((item) => {
  const transactionDate = new Date(item.date);

  return (
    item.type === "expense" &&
    transactionDate.getMonth() === currentMonth &&
    transactionDate.getFullYear() === currentYear
  );
});

  return (
    <div className="mt-8">
      {/* CHARTS */}

      <div className="grid xl:grid-cols-2 gap-8 mb-10">
        {/* TREND GRAPH */}

        <TrendChart transactions={monthlyTransactions} isDashboard={true} />

        {/* PIE CHART */}

        <ExpensePieChart
          transactions={monthlyTransactions}
          isDashboard={true}
        />
      </div>
    </div>
  );
}
