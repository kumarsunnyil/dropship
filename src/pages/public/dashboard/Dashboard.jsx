import { FiPackage, FiShoppingCart, FiCreditCard } from "react-icons/fi";
import Hero from "@/components/hero/Hero";
import Layout from "@/components/layout/Layout";

const Dashboard = () => {
	return (
		<>
			<Layout>
				<Hero />

				<section id="features" className="py-20 px-8 max-w-7xl mx-auto">
					<h3 className="text-4xl font-extrabold text-center mb-16 text-purple-800">
						Key Features
					</h3>
					<div className="grid md:grid-cols-3 gap-10">
						{/* Card 1 */}
						<div className="p-8 bg-white border-2 border-purple-700 text-gray-900 rounded-2xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-300">
							<h4 className="font-bold text-xl mb-3 flex items-center">
								<FiPackage className="mr-2 text-2xl text-purple-700" />{" "}
								Product Sync
							</h4>
							<p className="text-sm opacity-90 leading-relaxed">
								Keep your store products always up-to-date
								automatically.
							</p>
						</div>

						{/* Card 2 */}
						<div className="p-8 bg-white border-2 border-purple-700 text-gray-900 rounded-2xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-300">
							<h4 className="font-bold text-xl mb-3 flex items-center">
								<FiShoppingCart className="mr-2 text-2xl text-purple-700" />{" "}
								Order Management
							</h4>
							<p className="text-sm opacity-90 leading-relaxed">
								Manage new, processing, and fulfilled orders seamlessly.
							</p>
						</div>

						{/* Card 3 */}
						<div className="p-8 bg-white border-2 border-purple-700 text-gray-900 rounded-2xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition duration-300">
							<h4 className="font-bold text-xl mb-3 flex items-center">
								<FiCreditCard className="mr-2 text-2xl text-purple-700" />{" "}
								Billing & Payments
							</h4>
							<p className="text-sm opacity-90 leading-relaxed">
								Integrated subscription and payment handling for your
								clients.
							</p>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default Dashboard;
