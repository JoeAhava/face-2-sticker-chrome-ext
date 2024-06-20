import { stickerize } from "../services/stickerize";
import { AppContext } from "../store";
import { useContext, useEffect, useState } from "react";
export const useStickerize = (file: File | null) => {
	const appContext = useContext(AppContext);
	const [loadingSticker, setLoadingSticker] = useState<boolean>(false);
	const [errSticker, setErrSticker] = useState<string | null>(null);
	const [sticker, setSticker] = useState<string | null>(null);

	useEffect(() => {
		if (file) {
			setLoadingSticker(true);
			(async () => {
				let img;
				const reader = new FileReader();
				reader.onloadend = async () => {
					try {
						
						img = reader.result as string;
						const sticker = await stickerize({
						...appContext,
						image: img,
					}, appContext.apiKey);
					if (sticker.status >= 200 && sticker.status < 300) {
						setSticker(sticker.data?.urls?.get);
						setLoadingSticker(false);
					} else if(sticker.status === 401 || sticker.status === 403) {
						setErrSticker(
							"Invalid API Key, Please provide API key under the settings icon",
						);
						setLoadingSticker(false);
					} else {
						setErrSticker(
							`${sticker.data?.detail}, ${sticker.status == 401 ? "Please pass a token under the settings icon." : ""}`,
						);
						setLoadingSticker(false);
					}
					} catch (e: any) {
						setErrSticker(
							`${e?.response?.data?.detail}, ${e?.response?.status == 401 ? "Please pass a token under the settings icon." : ""}`,
						);
						setLoadingSticker(false);
				 }
				};
				reader.onerror = () => {
					setErrSticker(
						"Unable to stickerize, please try again later",
					);
					setLoadingSticker(false);
				};
				reader.readAsDataURL(file);
			})();
		}
	}, [file, appContext]);

	return { loadingSticker, errSticker, sticker };
};
