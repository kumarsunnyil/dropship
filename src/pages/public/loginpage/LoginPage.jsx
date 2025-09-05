import { loginApi } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../home/Home";
import NavbarGeneral from "@/components/navbar/NavBarGeneral";
import Navbar from "@/components/navbar/NavBar";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { user, token, login, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const { data } = await loginApi(username, password);

			// Save to Zustand
			if (data.accessToken) {
				login({ username: data.username }, data.accessToken);
				navigate("/upload");
			} else {
				throw new Error("Authentication token not received from server.");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Clear the Zustand store
	const handleLogout = () => {
		logout();
		setUsername("");
		setPassword("");
	};

	if (token) {
		return <Home />;
	}

	return (
		<>
			<NavbarGeneral />
			<div className="min-h-screen bg-violet-700 flex items-center justify-center p-4">
				<div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
					<h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
						Log In
					</h2>

					{error && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4"
							role="alert"
						>
							<p className="font-bold">Error</p>
							<p className="text-sm">{error}</p>
						</div>
					)}
					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="username"
							>
								Username
							</label>
							<input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
								placeholder="Enter your username"
								required
							/>
						</div>
						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
								placeholder="Enter your password"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400"
							disabled={isLoading}
						>
							{isLoading ? "Signing In..." : "Log In"}
						</button>
					</form>
					<p className="text-sm text-gray-600 text-center mt-6">
						Do not have an account?{" "}
						<a
							href="/signup"
							className="text-indigo-600 font-semibold hover:underline"
						>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
