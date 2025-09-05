import Layout from "@/components/layout/Layout";
import { useState } from "react";

const UploadInventory = () => {
  const [inventory, setInventory] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.name.endsWith(".json")) {
          setInventory(JSON.parse(e.target.result));
        } else if (file.name.endsWith(".xml")) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const parseNodes = (tagName, mapFn) =>
            Array.from(xmlDoc.getElementsByTagName(tagName)).map(mapFn);

          const capitalProducts = parseNodes("Product", (prod) => ({
            product_id: prod.getElementsByTagName("SKU")[0]?.textContent || "",
            title: prod.getElementsByTagName("Title")[0]?.textContent || "",
            quantity: prod.getElementsByTagName("Quantity")[0]?.textContent || "",
            price: prod.getElementsByTagName("Price")[0]?.textContent || "",
          }));

          const lowercaseProducts = parseNodes("product", (prod) => ({
            product_id: prod.getElementsByTagName("product_id")[0]?.textContent || "",
            title: prod.getElementsByTagName("title")[0]?.textContent || "",
            quantity: prod.getElementsByTagName("quantity")[0]?.textContent || "",
            price: "",
          }));

          setInventory([...capitalProducts, ...lowercaseProducts]);
        } else {
          alert("Please upload a valid JSON or XML file");
        }
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/inventory/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inventory),
    });
    alert("Uploaded successfully 🚀");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📦 Upload Inventory
          </h1>

          {/* Upload Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <p className="text-gray-600 mb-4">
              Upload your <span className="font-semibold">JSON</span> or{" "}
              <span className="font-semibold">XML</span> file to preview and save
              your inventory.
            </p>
            <input
              type="file"
              accept=".json,.xml"
              onChange={handleFileUpload}
              className="block w-full border rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table + Button */}
          {inventory.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Preview Inventory
                </h2>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Upload to Server
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100 text-gray-700 text-left">
                    <tr>
                      <th className="p-3 border">Product ID</th>
                      <th className="p-3 border">Title</th>
                      <th className="p-3 border">Quantity</th>
                      <th className="p-3 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition border-b last:border-0"
                      >
                        <td className="p-3">{item.product_id}</td>
                        <td className="p-3">{item.title}</td>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadInventory;
