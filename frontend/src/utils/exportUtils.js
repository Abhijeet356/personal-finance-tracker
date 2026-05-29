import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

// PDF EXPORT

export const exportPDF = (transactions) => {
  const doc = new jsPDF();

  doc.setFontSize(24);

  doc.text("SpendSense Financial Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 32);

  const tableData = transactions.map((item) => [
    item.date,

    item.type,

    item.category,

    item.paymentMode || item.paymentMethod,

    `₹${item.amount}`,
  ]);

  autoTable(doc, {
    head: [["Date", "Type", "Category", "Payment", "Amount"]],

    body: tableData,

    startY: 45,
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
