import { useState } from "react";
import { uploadFileApi } from "@/api/fileupload";
import Layout from "@/components/layout/Layout";

const UploadPage = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState("");

	const fileChangeHandler = (e) => {
		setFile(e.target.files[0]);
	};

	const uploadHandler = async () => {
		if (!file) {
			setMessage("Please select a file first.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const { data } = await uploadFileApi(file);
			if (data.success)
				setMessage(`File uploaded successfully!: ${data.filename}`);
		} catch (err) {
			console.error(err);
			setMessage("Error while uploading file.");
		}
	};

	return (
		<>
			<Layout>
				<div className="flex flex-col items-center pt-10 min-h-screen bg-gray-50">
					<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md min-h-[350px]">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Upload File
						</h2>
						<input
							type="file"
							onChange={fileChangeHandler}
							className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-5
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-400 file:text-white
        hover:file:bg-gray-500"
						/>

						<button
							onClick={uploadHandler}
							className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg"
						>
							Upload
						</button>

						{message && (
							<p className="mt-4 text-center text-sm text-green-700">
								{message}
							</p>
						)}
					</div>
				</div>
			</Layout>
		</>
	);
};

export default UploadPage;
