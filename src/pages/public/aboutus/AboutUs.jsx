import Footer from "@/components/footer/Footer";
import Layout from "@/components/layout/Layout";
import Navbar from "@/components/navbar/NavBar";

const AboutUs = () => {
  return (
      <Layout >
      <section className="text-center py-20">

      <div className="my-14 space-y-6">

      <h3 className="text-lg font-semibold mb-3">About Us</h3>
      <p className="text-sm text-black-200">
        DropshipPro helps businesses streamline inventory, manage orders,
        and scale their e-commerce operations with ease.
      </p>
      </div>
      </section>
          
    </Layout>
  );
}

export default AboutUs;
