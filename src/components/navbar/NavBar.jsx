import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { NavLink, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Navbar = () => {
	const username = useAuthStore((s) => s.user?.username ?? "");
	const logout = useAuthStore((s) => s.logout);
	const [open, setOpen] = useState(false);
	const [reportsOpen, setReportsOpen] = useState(false);
	const menuRef = useRef(null);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	useEffect(() => {
		function onClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpen(false);
				setReportsOpen(false);
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);

	return (
		<nav className="fixed top-0 left-0 w-full bg-violet-700 text-white px-6 py-3 flex justify-between items-center shadow-md z-50">
			{/* Left side - Brand */}
			<NavLink
				to="/"
				className={({ isActive }) =>
					`flex items-center gap-2 font-bold text-lg hover:text-gray-200 ${
						isActive ? "text-yellow-300" : ""
					}`
				}
			>
				<Home className="w-5 h-5" />
				<span>DropshipPro</span>
			</NavLink>

			{/* Desktop Menu */}
			<div className="hidden md:flex gap-8 items-center">
				<NavLink
					to="/dashboard"
					className={({ isActive }) =>
						`relative px-3 py-2 hover:text-gray-200 transition-colors duration-200
						${
							isActive
								? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-300 after:rounded"
								: ""
						}`
					}
				>
					Dashboard
				</NavLink>

				<NavLink
					to="/upload-inventory"
					className={({ isActive }) =>
						`relative px-3 py-2 hover:text-gray-200 transition-colors duration-200
						${
							isActive
								? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-300 after:rounded"
								: ""
						}`
					}
				>
					Upload Stocks
				</NavLink>

				<NavLink
					to="/analytics"
					className={({ isActive }) =>
						`relative px-3 py-2 hover:text-gray-200 transition-colors duration-200
						${
							isActive
								? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-300 after:rounded"
								: ""
						}`
					}
				>
					Analytics
				</NavLink>

				{/* Reports Dropdown */}
				<div className="relative">
					<button
						onClick={() => setReportsOpen(!reportsOpen)}
						className="relative px-3 py-2 hover:text-gray-200 transition-colors duration-200 flex items-center gap-1"
					>
						Reports
						<svg
							className={`w-4 h-4 transform transition-transform ${
								reportsOpen ? "rotate-180" : "rotate-0"
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{reportsOpen && (
						<div
							className="absolute left-0 mt-2 w-64 bg-white text-gray-700 
		border border-purple-500 rounded-xl shadow-xl overflow-hidden z-50"
						>
							<NavLink
								to="/reports"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Reports
							</NavLink>
							<NavLink
								to="/reports/order-error"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Order Error
							</NavLink>
							<NavLink
								to="/reports/orders-on-hold"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Orders On Hold
							</NavLink>
							<NavLink
								to="/reports/late-shipments"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Late Shipments
							</NavLink>
							<NavLink
								to="/reports/shipments"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Shipments
							</NavLink>
							<NavLink
								to="/reports/mapped-after-fulfillment"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Orders With Products Mapped After Fulfillment
							</NavLink>
							<NavLink
								to="/reports/fulfillment-requests"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Fulfillment Requests
							</NavLink>
							<NavLink
								to="/reports/product-insert-errors"
								className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
							>
								Product Insert Errors
							</NavLink>
						</div>
					)}
				</div>
								<NavLink
					to="/support"
					className={({ isActive }) =>
						`relative px-3 py-2 hover:text-gray-200 transition-colors duration-200
						${
							isActive
								? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-300 after:rounded"
								: ""
						}`
					}
				>
					Support
				</NavLink>
			</div>

			{/* Right side - User Dropdown */}
			<div className="relative hidden md:block" ref={menuRef}>
				<button
					className="flex items-center gap-2 focus:outline-none"
					onClick={() => setOpen(!open)}
				>
					<span className="font-medium">{username || "JohnDoe"}</span>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{open && (
					<div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg">
						<button className="w-full text-left px-4 py-2 hover:bg-gray-100">
							Profile
						</button>
						<button className="w-full text-left px-4 py-2 hover:bg-gray-100">
							Settings
						</button>
						<button
							className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
