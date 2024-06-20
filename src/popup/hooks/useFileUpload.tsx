import React, { useContext, useEffect, useState } from "react";
import { upload } from "../services/uploadFile";
import { AppContext } from "../store";
export default function useFileUpload(file: File | null = null) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [url, setUrl] = useState(null);
	const {apiKey} = useContext(AppContext)

	useEffect(() => {
		if (file) {
			setLoading(true);
			(async () => {
				try {
					const uploaded = await upload(file, apiKey);
					if (uploaded.status === 200 || uploaded.status === 201) {
						setUrl(uploaded.data?.urls?.get);
						setLoading(false);
					} else {
						setError(uploaded.data?.urls?.get);
						setLoading(false);
					}
				} catch (e) {
					setError("unable to upload file");
					setLoading(false);
				}
			})();
		}
	}, [file, apiKey]);
	return { loading, error, url };
}
