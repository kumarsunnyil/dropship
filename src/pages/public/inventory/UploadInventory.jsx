import Layout from "@/components/layout/Layout";
import { useState } from "react";

const UploadInventory = () => {
  const [fileName, setFileName] = useState("");
  const [inventory, setInventory] = useState([]);

  // Handle File Upload (JSON + XML)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.type === "application/json" || file.name.endsWith(".json")) {
          const jsonData = JSON.parse(e.target.result);
          setInventory(jsonData);
        } else if (
          file.type === "text/xml" ||
          file.type === "application/xml" ||
          file.name.endsWith(".xml")
        ) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");
          const products = Array.from(xmlDoc.getElementsByTagName("product")).map(
            (prod) => ({
              product_id: prod.getElementsByTagName("product_id")[0]?.textContent || "",
              title: prod.getElementsByTagName("title")[0]?.textContent || "",
              sku: prod.getElementsByTagName("sku")[0]?.textContent || "",
              quantity: prod.getElementsByTagName("quantity")[0]?.textContent || "",
              status: prod.getElementsByTagName("status")[0]?.textContent || "",
            })
          );
          setInventory(products);
        } else {
          alert("Please upload a valid JSON or XML file");
        }
      } catch (err) {
        console.error(err);
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  // Send to backend (example POST)
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/inventory/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),
      });

      if (res.ok) {
        alert("Inventory uploaded successfully 🚀");
      } else {
        alert("Upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading inventory");
    }
  };

  return (
    <>
      <Layout>

      <div className="bg-purple-600 py-14 w-full min-h-screen space-y-6">
        <h1 className="text-2xl font-bold text-white">📦 Upload Inventory</h1>

        {/* File Upload */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            type="file"
            accept=".json,.xml"
            onChange={handleFileUpload}
            className="block w-full border p-2 rounded cursor-pointer"
          />
          {fileName && (
            <p className="text-sm text-gray-600">Uploaded: {fileName}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!inventory.length}
            className={`px-4 py-2 rounded text-white ${
              inventory.length
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Upload to Server
          </button>
        </div>

        {/* Preview Table */}
        {inventory.length > 0 && (
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Preview Inventory</h2>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Product ID</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">SKU</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.product_id}</td>
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.sku}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td
                      className={`p-2 font-medium ${
                        item.status === "low_stock"
                          ? "text-yellow-600"
                          : item.status === "overstock"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      </Layout>
    </>
  );
};

export default UploadInventory;
