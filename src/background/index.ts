import {
	runtime,
	storage,
	windows,
	tabs,
	Tabs,
	action,
} from "webextension-polyfill";
import { stickerize } from "./stickerize";
import { getUploadedImg } from "./getUploadedImg";

type Message = {
	from: string;
	to: string;
	action: string;
	payload: any;
};

export function init() {
	runtime.onMessage.addListener(async (message: Message) => {
		console.log("worker message received", message);
		if (message.to === "stickerize") {
			console.log("Stickerize Called");
			try {
				const response = await stickerize(
					message.payload?.requestBody,
					message.payload?.apiKey,
				);
				console.log("stickerize response", response);

				if (response.status >= 200 && response.status < 300) {
					const url = response.data?.urls?.get;
					await storage.local.set({
						pollingURL: response.data?.urls?.get,
					});

					let pollForUpdates: NodeJS.Timer;
					pollForUpdates = setInterval(async () => {
						console.log("Polling ...");
						try {
							const data = await getUploadedImg(url, message.payload?.apiKey);
							if (data.length > 0) {
								runtime.sendMessage({
									from: "stickerize",
									to: "popup",
									action: "success",
									payload: data,
								});
								clearInterval(pollForUpdates);
							}
						} catch (err: any) {
							console.error("fetch sticker error", err);
							return runtime.sendMessage({
								from: "stickerize",
								to: "popup",
								action: "error",
								payload: err.response,
							});
						}
						// setLoading(false);
					}, 4000);
					console.log("Interval set");

					return runtime.sendMessage({
						from: "stickerize",
						to: "popup",
						action: "processing",
						payload: response,
					});
				} else {
					return runtime.sendMessage({
						from: "stickerize",
						to: "popup",
						action: "error",
						payload: response,
					});
				}
			} catch (err: any) {
				console.error("stickerize error", err);
				return runtime.sendMessage({
					from: "stickerize",
					to: "popup",
					action: "error",
					payload: err.response,
				});
			}
		}
	});

	console.log("Worker loaded");
}

runtime.onInstalled.addListener(async () => {
	await storage.local.clear();
	init();
});
