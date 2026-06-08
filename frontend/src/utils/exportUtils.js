import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// PDF EXPORT
export const exportPDF = (transactions, currentBalance) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const doc = new jsPDF();

  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("SpendSense Financial Report", 20, 20);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString("en-IN")}`, 20, 30);

  const tableData = transactions.map((item) => [
    new Date(item.date).toLocaleDateString("en-IN"),
    item.type,
    item.category,
    item.paymentMode || item.paymentMethod,
    `Rs. ${item.amount}`,
  ]);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Financial Summary", 20, 50);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Current Balance: Rs. ${currentBalance.toLocaleString()}`, 20, 60);
  doc.text(`Total Income: Rs. ${totalIncome.toLocaleString()}`, 20, 68);
  doc.text(`Total Expenses: Rs. ${totalExpenses.toLocaleString()}`, 20, 76);
  doc.text(`Transactions: ${transactions.length}`, 20, 84);

  autoTable(doc, {
    head: [["Date", "Type", "Category", "Payment", "Amount"]],
    body: tableData,
    startY: 95,
  });
  doc.save("SpendSense_Report.pdf");
};

// CSV EXPORT
export const exportCSV = (transactions) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "csv",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(blob, "SpendSense_Transactions.csv");
};

// EXCEL EXPORT
export const exportExcel = (transactions) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(blob, "SpendSense_Analytics.xlsx");
};


export const exportAnalyticsReport = ( transactions, currentBalance, monthlyBudget = 0) => {
  const doc = new jsPDF();
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const savings = totalIncome - totalExpenses;

  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        Number(t.amount);
    });

  const topCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const budgetUsed =
    monthlyBudget > 0
      ? ((totalExpenses / monthlyBudget) * 100).toFixed(1)
      : 0;

  doc.setFontSize(24);
  doc.text("SpendSense Analytics Report", 20, 20);
  doc.setFontSize(12);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    20,
    32
  );
  doc.setFontSize(16);
  doc.text("Financial Summary", 20, 50);
  doc.setFontSize(12);
  doc.text(
    `Current Balance: Rs. ${currentBalance.toLocaleString()}`,
    20,
    62
  );
  doc.text(
    `Total Income: Rs. ${totalIncome.toLocaleString()}`,
    20,
    70
  );
  doc.text(
    `Total Expenses: Rs. ${totalExpenses.toLocaleString()}`,
    20,
    78
  );
  doc.text(
    `Savings: Rs. ${savings.toLocaleString()}`,
    20,
    86
  );
  doc.text(
    `Transactions: ${transactions.length}`,
    20,
    94
  );
  doc.setFontSize(16);
  doc.text("Budget Analysis", 20, 114);
  doc.setFontSize(12);
  doc.text(
    `Monthly Budget: Rs. ${monthlyBudget.toLocaleString()}`,
    20,
    126
  );
  doc.text(
    `Budget Used: ${budgetUsed}%`,
    20,
    134
  );
  doc.text(
    `Remaining Budget: Rs. ${(monthlyBudget - totalExpenses).toLocaleString()}`,
    20,
    142
  );
  doc.setFontSize(16);
  doc.text("Top Spending Category", 20, 162);
  doc.setFontSize(12);
  doc.text(
    topCategory
      ? `${topCategory[0]} - Rs. ${topCategory[1].toLocaleString()}`
      : "No expenses found",
    20,
    174
  );
  doc.setFontSize(16);
  doc.text("Smart Insights", 20, 194);
  doc.setFontSize(12);
  
  let y = 206;

  if (totalExpenses > totalIncome) {
    doc.text(
      "• Expenses exceeded income.",
      20,
      y
    );
    y += 8;
  }

  if (budgetUsed > 80) {
    doc.text(
      "• Budget usage is above 80%.",
      20,
      y
    );
    y += 8;
  }

  if (topCategory) {
    doc.text(
      `• Highest spending category: ${topCategory[0]}`,
      20,
      y
    );
  }

  doc.save("SpendSense_Analytics_Report.pdf");
};