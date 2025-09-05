import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, BarChart, FileText, Upload } from "lucide-react";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Sidebar (Desktop & Tablet) */}
			<div
				className={`fixed top-14 left-0 h-full bg-violet-800 text-white shadow-lg transition-all duration-300 
				${isOpen ? "w-60" : "w-16"} hidden md:flex flex-col`}
			>
				{/* Toggle Button */}
				<button
					className="absolute -right-3 top-4 bg-violet-700 p-1 rounded-full shadow"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
				</button>

				{/* Sidebar Links */}
				<nav className="mt-10 flex flex-col gap-4 px-4">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`flex items-center gap-3 p-2 rounded-md hover:bg-violet-600 ${
								isActive ? "bg-violet-700 font-semibold" : ""
							}`
						}
					>
						<Home className="w-5 h-5" />
						{isOpen && <span>Home</span>}
					</NavLink>

					<NavLink
						to="/dashboard"
						className={({ isActive }) =>
							`flex items-center gap-3 p-2 rounded-md hover:bg-violet-600 ${
								isActive ? "bg-violet-700 font-semibold" : ""
							}`
						}
					>
						<BarChart className="w-5 h-5" />
						{isOpen && <span>Dashboard</span>}
					</NavLink>

					<NavLink
						to="/upload-inventory"
						className={({ isActive }) =>
							`flex items-center gap-3 p-2 rounded-md hover:bg-violet-600 ${
								isActive ? "bg-violet-700 font-semibold" : ""
							}`
						}
					>
						<Upload className="w-5 h-5" />
						{isOpen && <span>Upload Stocks</span>}
					</NavLink>

					<NavLink
						to="/reports"
						className={({ isActive }) =>
							`flex items-center gap-3 p-2 rounded-md hover:bg-violet-600 ${
								isActive ? "bg-violet-700 font-semibold" : ""
							}`
						}
					>
						<FileText className="w-5 h-5" />
						{isOpen && <span>Reports</span>}
					</NavLink>
				</nav>
			</div>

			{/* Mobile Sidebar */}
			<div className="md:hidden">
				<button
					className="fixed top-16 left-4 z-50 bg-violet-700 p-2 rounded-md shadow"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>

				{isOpen && (
					<div className="fixed top-14 left-0 w-60 h-full bg-violet-800 text-white shadow-lg flex flex-col px-4 py-6 z-40">
						<NavLink to="/" className="py-2 hover:bg-violet-600 rounded">
							Home
						</NavLink>
						<NavLink to="/dashboard" className="py-2 hover:bg-violet-600 rounded">
							Dashboard
						</NavLink>
						<NavLink to="/upload" className="py-2 hover:bg-violet-600 rounded">
							Upload
						</NavLink>
						<NavLink to="/reports" className="py-2 hover:bg-violet-600 rounded">
							Reports
						</NavLink>
					</div>
				)}
			</div>
		</>
	);
};

export default Sidebar;
