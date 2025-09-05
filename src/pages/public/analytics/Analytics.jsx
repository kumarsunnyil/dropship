import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import { FaChartBar } from "react-icons/fa";
import Layout from "@/components/layout/Layout";

const Analytics = () => {
	// Dummy Data
	const sales = [
		{ product: "Earbuds", sales: 75000 },
		{ product: "Smart Watch", sales: 52000 },
		{ product: "Laptop Stand", sales: 40000 },
		{ product: "Fitness Band", sales: 38000 },
		{ product: "Phone Case", sales: 20000 },
	];

	const orderStatus = [
		{ name: "Processing", value: 45 },
		{ name: "Shipped", value: 190 },
		{ name: "Delivered", value: 70 },
		{ name: "Cancelled", value: 15 },
	];

	const inventoryAlerts = [
		{ product: "Earbuds", stock: 12, status: "Low Stock" },
		{ product: "Smart Watch", stock: 5, status: "Critical" },
		{ product: "Laptop Stand", stock: 120, status: "Healthy" },
		{ product: "Fitness Band", stock: 8, status: "Low Stock" },
		{ product: "Phone Case", stock: 250, status: "Overstock" },
	];

	const COLORS = ["#8b5cf6", "#6366f1", "#10b981", "#ef4444"];

	return (
		<>
			<Layout>
			<div className="my-14 space-y-6">
				{/* Header */}
				<h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
					<FaChartBar className="text-violet-700" />
					Dashboard Analytics
				</h1>

				{/* KPI Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div className="bg-violet-600 text-white p-4 rounded-lg shadow">
						<h2 className="text-sm">Total Revenue</h2>
						<p className="text-xl font-bold">₹2,45,000</p>
					</div>
					<div className="bg-indigo-600 text-white p-4 rounded-lg shadow">
						<h2 className="text-sm">Orders</h2>
						<p className="text-xl font-bold">320</p>
					</div>
					<div className="bg-green-600 text-white p-4 rounded-lg shadow">
						<h2 className="text-sm">Avg Order Value</h2>
						<p className="text-xl font-bold">₹765</p>
					</div>
					<div className="bg-yellow-600 text-white p-4 rounded-lg shadow">
						<h2 className="text-sm">Conversion Rate</h2>
						<p className="text-xl font-bold">2.8%</p>
					</div>
				</div>

				{/* Charts Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Sales Bar Chart */}
					<div className="bg-white shadow rounded-lg p-4">
						<h2 className="text-lg font-semibold mb-4">
							Top Products (Sales)
						</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={sales}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="product" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="sales" fill="#8b5cf6" />
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Orders Pie Chart */}
					<div className="bg-white shadow rounded-lg p-4">
						<h2 className="text-lg font-semibold mb-4">Order Status</h2>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={orderStatus}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
									outerRadius={120}
									fill="#8884d8"
									dataKey="value"
								>
									{orderStatus.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Inventory Alerts Table */}
				<div className="bg-white shadow rounded-lg p-4">
					<h2 className="text-lg font-semibold mb-4">
						📦 Inventory Alerts
					</h2>
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-gray-100 text-left">
								<th className="p-2">Product</th>
								<th className="p-2">Stock</th>
								<th className="p-2">Status</th>
							</tr>
						</thead>
						<tbody>
							{inventoryAlerts.map((item, index) => (
								<tr
									key={index}
									className="border-b hover:bg-gray-50 transition"
								>
									<td className="p-2">{item.product}</td>
									<td className="p-2">{item.stock}</td>
									<td
										className={`p-2 font-medium ${
											item.status === "Critical"
												? "text-red-600"
												: item.status === "Low Stock"
												? "text-yellow-600"
												: item.status === "Overstock"
												? "text-blue-600"
												: "text-green-600"
										}`}
									>
										{item.status}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			</Layout>
		</>
	);
};
export default Analytics;
