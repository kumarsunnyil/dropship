const Hero = () => {
	return (
		<section
			className="text-center py-20 text-white"
			// style={{ backgroundColor: "#672AB7" }}
			style={{ backgroundColor: "rgb(113 49 197)" }}
		>
			<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
				{/* Left: Text */}
				<div>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Smart Dropshipping Platform
					</h2>
					<p className="text-lg mb-8">Boost Profits Effortlessly</p>
					<div className="flex justify-center md:justify-start gap-4">
						<button className="px-6 py-3 bg-white text-[#672AB7] font-semibold rounded-lg shadow hover:bg-gray-100">
							Get Started
						</button>
						<button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-[#581c87]">
							Watch Demo
						</button>
					</div>
				</div>

				{/* Right: Image */}
				<div className="flex justify-center">
					<img
						src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
						alt="Dashboard Preview"
						className="rounded-lg shadow-lg"
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
