import axios from "axios";
export const upload = async (file: File, apiKey: string) => {
	const data = new FormData();
	data.append("content", file);
	data.append("type", file.type);
	data.append("filename", file.name);
	return axios.post("https://api.replicate.com/v1/files", data, {
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "multipart/form-data",
			// "Access-Control-Allow-Origin": "*",
			// "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
		withCredentials: true,
	});
};
