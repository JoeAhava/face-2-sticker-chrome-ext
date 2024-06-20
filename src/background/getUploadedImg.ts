import { Context } from "react";
export const getUploadedImg = async (imgURL: string, apiKey: string) => {
	// function arrayBufferToBase64(buffer: ArrayBuffer) {
	// 	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
	// }
	const getBase64Image: any = async (res: Response): Promise<any> => {
		if (res.status >= 200 && res.status < 300) {
			const jsonResponse = await res.json();
			// const blob = await res.blob();

			// const reader = new FileReader();

			// const result = await new Promise((resolve, reject) => {
			// reader.onload = resolve;
			// reader.onerror = reject;
			// reader.readAsDataURL(blob);
			// });
			// const binaryData = await res.arrayBuffer();
			// const base64 = arrayBufferToBase64(binaryData);
			// const dataUrl = `data:image/png;base64,${base64}`;
			// const dataUrl = URL.createObjectURL(blob);
			// let result = "";
			// reader.onloadend = () => (result = reader.result as string);
			if (jsonResponse?.status === "succeeded") return jsonResponse?.output;
			return false;
		}
	};
	return fetch(imgURL, {
		headers: {
			Authorization: `Bearer ${apiKey}`,
			// "Content-Type": "image/*",
			// "Access-Control-Allow-Origin": "*",
			// "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
	}).then((res) =>
		res.json().then((jsonResponse) => {
			if (jsonResponse?.status === "succeeded")
				return Array.from<string>(jsonResponse?.output).length > 0
					? Array.from<string>(jsonResponse?.output)[0]
					: "";
			return "";
		}),
	);
	// .then((imgString) => imgString);
};
