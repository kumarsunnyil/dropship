import API from "./api";

const documentUpload = `/documents/upload`;
export const uploadFileApi = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	return API.post(documentUpload, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};
