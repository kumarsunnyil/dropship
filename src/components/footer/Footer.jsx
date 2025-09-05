import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		
		<footer className="bg-gradient-to-r from-indigo-900 via-blue-950 to-slate-900 text-white py-10 shadow-inner w-full bottom-0 left-0 w-full z-50">
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
				
				{/* About Us */}
				<div>
					<h3 className="text-lg font-semibold mb-3">About Us</h3>
					<p className="text-sm text-gray-200 leading-relaxed">
						DropshipPro is your trusted platform to simplify and automate 
						dropshipping with powerful dashboards, inventory sync, and order management.
					</p>
					<Link 
						to="/aboutus" 
						className="inline-block mt-3 text-sm hover:text-gray-300"
					>
						Learn More →
					</Link>
				</div>

				{/* Contact Us */}
				<div>
					<h3 className="text-lg font-semibold mb-3">Contact Us</h3>
					<ul className="space-y-2 text-sm text-gray-200">
						<li>Email: support@dropshippro.com</li>
						<li>Phone: +91 85508 08155</li>
						<li>Location: Bangalore, India</li>
					</ul>
				</div>

				{/* Social Media */}
				<div>
					<h3 className="text-lg font-semibold mb-3">Follow Us</h3>
					<div className="flex justify-center md:justify-start gap-6 text-xl">
						<a href="#" className="hover:text-gray-300" aria-label="Facebook">
							<FaFacebookF />
						</a>
						<a href="#" className="hover:text-gray-300" aria-label="Twitter">
							<FaTwitter />
						</a>
						<a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
							<FaLinkedinIn />
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-violet-500 mt-8 pt-4 text-center text-sm text-gray-200">
				© {new Date().getFullYear()} DropshipPro – All Rights Reserved.
			</div>
		</footer>
	);
};

export default Footer;
