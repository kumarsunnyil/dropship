import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";

function Navbar() {
	const username = useAuthStore((s) => s.user?.username ?? "");
	const logout = useAuthStore((s) => s.logout);
	const linkClasses = ({ isActive }) =>
		`hover:text-gray-200 transition ${
			isActive ? "font-semibold border-b-2 border-white" : ""
		}`;

	const [open, setOpen] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const navigate = useNavigate();
	const menuRef = useRef(null);

	const handleLogout = () => {
		logout();
		navigate("/"); // back to login
	};

	useEffect(() => {
		function onClickOutside(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpen(false);
				setMobileMenu(false);
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);

	return (
		<nav className="fixed top-0 left-0 w-full bg-violet-700 text-white px-6 py-3 flex justify-between items-center shadow-md z-50">
			{/* Left side - Brand */}
			<div className="font-bold text-lg">
				<NavLink
					to="/"
					className="flex items-center gap-2 font-bold text-lg hover:text-gray-200"
				>
					<Home className="w-5 h-5" />
					<span>DropshipPro</span>
				</NavLink>
			</div>

			{/* Center - Desktop Menu */}
			<div className="hidden md:flex gap-10">
				<NavLink to="/dashboard" className={linkClasses}>
					Dashboard
				</NavLink>
				<NavLink to="/upload-inventory" className={linkClasses}>
					Upload Stocks
				</NavLink>
				<NavLink to="/analytics" className={linkClasses}>
					Analytics
				</NavLink>
				<NavLink to="/reports" className={linkClasses}>
					Reports
				</NavLink>
			</div>

			{/* Right side */}
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

				{/* Dropdown */}
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

			{/* Mobile Hamburger */}
			<div className="md:hidden">
				<button onClick={() => setMobileMenu(!mobileMenu)}>
					{mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenu && (
				<div className="absolute top-16 left-0 w-full bg-violet-700 flex flex-col items-center gap-4 py-6 shadow-lg md:hidden z-40">
					<NavLink
						to="/dashboard"
						className={linkClasses}
						onClick={() => setMobileMenu(false)}
					>
						Dashboard
					</NavLink>
					<NavLink
						to="/upload-inventory"
						className={linkClasses}
						onClick={() => setMobileMenu(false)}
					>
						Upload Stocks
					</NavLink>
					<NavLink
						to="/analytics"
						className={linkClasses}
						onClick={() => setMobileMenu(false)}
					>
						Analytics
					</NavLink>
					<NavLink
						to="/reports"
						className={linkClasses}
						onClick={() => setMobileMenu(false)}
					>
						Reports
					</NavLink>
					<button
						className="mt-4 px-4 py-2 bg-white text-violet-700 rounded-md font-semibold"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
