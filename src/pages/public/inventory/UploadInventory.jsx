import Layout from "@/components/layout/Layout";
import { useState } from "react";

const UploadInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Filter inventory by search
  const filteredInventory = inventory.filter(
    (item) =>
      item.product_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6 px-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📦 Upload Inventory
          </h1>

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

          {inventory.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Preview Inventory
                </h2>

                <input
                  type="text"
                  placeholder="Search by Product ID or Title..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset page on search
                  }}
                  className="border rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Upload to Server
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedInventory.length > 0 ? (
                  paginatedInventory.map((item, i) => (
                    <div
                      key={i}
                      className="border border-gray-300 rounded-lg p-4 shadow-sm hover:border-purple-700 hover:shadow-md transition bg-gray-50"
                    >
                      <div className="mb-2">
                        <span className="font-semibold">Product ID:</span>{" "}
                        <span>{item.product_id}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Title:</span>{" "}
                        <span>{item.title}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Quantity:</span>{" "}
                        <span>{item.quantity}</span>
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Price:</span>{" "}
                        <span>{item.price}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No products found.
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadInventory;
