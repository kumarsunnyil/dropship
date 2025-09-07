import { FaTools } from "react-icons/fa";
import Layout from "@/components/layout/Layout";
const SupportPage = () => {
  return (
    <>
      <Layout >
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50">
			<div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl min-h-[380px] flex flex-col items-center justify-center border border-purple-200">
				
				{/* Icon + Heading */}
				<FaTools className="text-purple-600 text-6xl mb-4 animate-bounce" />
				<h1 className="text-4xl font-extrabold text-purple-700 mb-2 text-center">
					Help & Support
				</h1>
				
				{/* Message */}
				<p className="text-lg text-gray-600 text-center">
					Support Center - Always Ready to Assist
				</p>

				{/* CTA Button */}
				<button className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-purple-700 transition">
					Dashboard
				</button>
			</div>
		</div>
      </Layout>
    </>

  );
}

export default SupportPage;
