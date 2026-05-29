export default function ExportButtons() {
  return (
    <div className="flex gap-5">
      <button className="btn btn-primary">Download PDF</button>

      <button className="btn bg-green-500 text-white hover:bg-green-600">
        Export CSV
      </button>

      <button className="btn bg-orange-500 text-white hover:bg-orange-600">
        Generate Report
      </button>
    </div>
  );
}
