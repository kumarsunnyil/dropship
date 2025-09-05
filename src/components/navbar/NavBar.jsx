import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { NavLink, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Navbar = () => {
	const username = useAuthStore((s) => s.user?.username ?? "");
	const logout = useAuthStore((s) => s.logout);
	const [open, setOpen] = useState(false);
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
			<div className="hidden md:flex gap-8">
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

				<NavLink
					to="/reports"
					className={({ isActive }) =>
						`relative px-3 py-2 hover:text-gray-200 transition-colors duration-200
			${
				isActive
					? "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-300 after:rounded"
					: ""
			}`
					}
				>
					Reports
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
