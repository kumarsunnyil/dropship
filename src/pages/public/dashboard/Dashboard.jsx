import Hero from "@/components/hero/Hero";
import Layout from "@/components/layout/Layout";

const Dashboard = () => {
	return (
		<>
			<Layout >
			<Hero /> 

			<section id="features" className="py-16 px-8 max-w-6xl mx-auto">
				<h3 className="text-3xl font-bold text-center mb-12 text-purple-700">
					Key Features
				</h3>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
						<h4 className="font-bold text-lg mb-2">📦 Product Sync</h4>
						<p>
							Keep your store products always up-to-date automatically.
						</p>
					</div>
					<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
						<h4 className="font-bold text-lg mb-2">
							🛒 Order Management
						</h4>
						<p>
							Manage new, processing, and fulfilled orders seamlessly.
						</p>
					</div>
					<div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
						<h4 className="font-bold text-lg mb-2">
							💳 Billing & Payments
						</h4>
						<p>
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
