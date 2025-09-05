import Navbar from "@/components/navbar/NavBar";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 ml-60">
        {/* Navbar */}
        <Navbar />

        {/* Page Content (pushes Footer down) */}
        <main className="flex-1 p-6 mt-14 overflow-y-auto">
          {children}
        </main>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
