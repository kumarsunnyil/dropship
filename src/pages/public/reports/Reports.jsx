import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

// --- Chart Data ---
const salesData = [
  { month: "Jan", sales: 400, profit: 240 },
  { month: "Feb", sales: 300, profit: 139 },
  { month: "Mar", sales: 500, profit: 380 },
  { month: "Apr", sales: 278, profit: 190 },
  { month: "May", sales: 600, profit: 400 },
  { month: "Jun", sales: 450, profit: 210 },
];

const inventoryData = [
  { category: "Electronics", stock: 120 },
  { category: "Clothing", stock: 90 },
  { category: "Shoes", stock: 60 },
  { category: "Accessories", stock: 30 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"];

// --- Reports Component ---
const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic
  const sortedData = [...salesData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Export CSV
  const exportCSV = () => {
    const headers = ["Month", "Sales", "Profit"];
    const rows = sortedData.map((row) => [row.month, row.sales, row.profit]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "reports.csv";
    link.click();
  };

  return (
    <Layout>
      <div className="p-6 space-y-10">
        <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>

        {/* Sales Trend Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#6366F1" />
              <Line type="monotone" dataKey="profit" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Comparison Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6366F1" />
              <Bar dataKey="profit" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Inventory Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="stock"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {inventoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table with Pagination + Sorting + Export */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales Data Table</h2>
            <button
              onClick={exportCSV}
              className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
            >
              Export CSV
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                {["month", "sales", "profit"].map((key) => (
                  <th
                    key={key}
                    className="py-2 px-4 border-b cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="capitalize">{key}</span>
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{row.month}</td>
                  <td className="py-2 px-4 border-b">{row.sales}</td>
                  <td className="py-2 px-4 border-b">{row.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
