import { useState } from "react";
import { Download, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Reports = () => {
  const [search, setSearch] = useState("");

  // Example data
  const reports = [
    { id: 1, title: "Sales Report Q1", date: "2025-03-01", status: "Completed" },
    { id: 2, title: "Inventory Report", date: "2025-03-10", status: "In Progress" },
    { id: 3, title: "Customer Feedback", date: "2025-03-15", status: "Completed" },
    { id: 4, title: "Returns Report", date: "2025-03-20", status: "Pending" },
  ];

  // Filtered reports based on search
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    // Replace with real export logic (CSV/PDF API call)
    alert("Exporting Reports...");
  };

  return (
   <Layout>
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-violet-800">Reports</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded-lg shadow"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow rounded-lg p-2 mb-6 w-full md:w-1/3">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none"
        />
      </div>

      {/* Reports Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-violet-700 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{report.id}</td>
                  <td className="p-3">{report.title}</td>
                  <td className="p-3">{report.date}</td>
                  <td
                    className={`p-3 font-medium ${
                      report.status === "Completed"
                        ? "text-green-600"
                        : report.status === "Pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  >
                    {report.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default Reports;
