import axios from "axios";
export const stickerize = async (
	options: any,
	apiKey: string,
	img?: string,
) => {
	return axios.post(
		"https://api.replicate.com/v1/predictions",
		{
			version:
				"764d4827ea159608a07cdde8ddf1c6000019627515eb02b6b449695fd547e5ef",
			input: {
				image: img,
				...options,
			},
		},
		{
			headers: {
				Authorization: `Bearer ${apiKey}`,
				// "Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
			},
			withCredentials: true,
		},
	);
};
