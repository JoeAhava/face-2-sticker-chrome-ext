import { stickerize } from "../services/stickerize";
import { AppContext } from "../store";
import { useContext, useEffect, useState } from "react";
import { windows, tabs, runtime } from "webextension-polyfill";
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
						// const sticker = await stickerize(
						// 	{
						// 		...appContext,
						// 		image: img,
						// 	},
						// 	appContext.apiKey,
						// );
						const callBg = await runtime.sendMessage({
							from: "popup",
							to: "stickerize",
							action: "stickerize",
							payload: {
								requestBody: {
									...appContext,
									image: img,
								},
								apiKey: appContext.apiKey,
							},
						});
						setLoadingSticker(false);
					} catch (e: any) {
						setErrSticker(
							`${e?.response?.data?.detail}, ${
								e?.response?.status == 401
									? "Please pass a token under the settings icon."
									: ""
							}`,
						);
						setLoadingSticker(false);
					}
				};
				reader.onerror = () => {
					setErrSticker("Unable to stickerize, please try again later");
					setLoadingSticker(false);
				};
				reader.readAsDataURL(file);
			})();
		}
	}, [file, appContext]);

	return { loadingSticker, errSticker, sticker };
};
