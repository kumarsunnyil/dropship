import LoginPage from "./pages/public/loginpage/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/home/Home";
import Dashboard from "./pages/public/dashboard/Dashboard";
import SignupPage from "./pages/public/register/SignupPage";
import UploadInventory from "./pages/public/inventory/UploadInventory";
import Analytics from "./pages/public/analytics/Analytics";
import AboutUs from "./pages/public/aboutus/AboutUs";
import Reports from "./pages/public/reports/Reports";

export const App = () => {
	return (
    <div className="flex flex-col min-h-screen">
				<Router>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/" element={<Home />} />
						<Route path="/aboutus" element={<AboutUs />} /> 
						<Route path="/analytics" element={<Analytics />} /> 
						<Route path="/upload-inventory" element={<UploadInventory />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/reports" element={<Reports />} />
					</Routes>
				</Router>
    </div>
	);
}

export default App;
