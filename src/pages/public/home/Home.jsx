import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/NavBar";

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
				<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
					Home Page
				</div>
			</div>
      <Footer />
		</>
	);
};

export default Home;
