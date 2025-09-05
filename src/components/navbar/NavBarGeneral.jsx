import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Home } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function NavbarGeneral() {
	const username = useAuthStore((s) => s.user?.username ?? "");
	const logout = useAuthStore((s) => s.logout);
	const linkClasses = ({ isActive }) =>
		`hover:text-gray-200 transition ${
			isActive ? "font-semibold border-b-2 border-stone" : ""
		}`;

	// const { username, logout } = useAuthStore();
	const [open, setOpen] = useState(false);
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
			}
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);

	return (
		<nav className="fixed top-0 left-0 w-full bg-violet-700 text-white px-6 py-3 flex justify-between items-center shadow-md z-50">
			{/* Left side */}
			<div className="font-bold text-lg">
				<NavLink
					to="/"
					className="flex items-center gap-2 font-bold text-lg hover:text-gray-200"
				>
					<Home className="w-5 h-5" />
					<span>DropshipPro</span>
				</NavLink>
			</div>
			{/* Center - Menu Items */}
			<div className="flex gap-10">
				<NavLink to="/dashboard" className={linkClasses}>
					Dashboard
				</NavLink>
				<NavLink to="/#" className={linkClasses}>
					Pricing
				</NavLink>
				<NavLink to="/#" className={linkClasses}>
					About Us
				</NavLink>
				<NavLink to="/#" className={linkClasses}>
					Contact Us
				</NavLink>
			</div>

			{/* Right side */}
			<div className="relative">
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
		</nav>
	);
}

export default NavbarGeneral;
