import {
	windows,
	tabs,
	storage,
	browserAction,
	runtime,
	scripting,
} from "webextension-polyfill";

// function init() {
// 	storage.local.get("windowID").then((winID) => {
// 		if (!winID) {
// 			tabs
// 				.query({
// 					windowId: winID,
// 				})
// 				.then((t) => {
// 					if (t.length > 0) {
// 					}
// 				});
// 		}
// 	});
// }

// const loadWindow = async () => {
// 	const newWin = await windows.create({
// 		type: "popup",
// 	});
// 	if (newWin.title) {
// 		const tab = await tabs.create({
// 			windowId: newWin.id,
// 			active: true,
// 			title: "Stickerize",
// 			pinned: true,
// 		});
// 		if (tab.title) {
// 			const store = await storage.local.set({
// 				windowId: newWin.id,
// 				tabId: tab.id,
// 			});
// 		}
// 		console.log("Window Opened in content script");
// 	}
// };

// loadWindow();

// async function init() {
// browserAction.onClicked.addListener(() => {
// 	tabs
// 		.create({
// 			url: runtime.getURL("result.html"),
// 		})
// 		.then(async (tab) => {
// 			const store = await storage.local.set({
// 				tabID: tab.id,
// 				windowID: tab.windowId,
// 			});
// 			return store;
// 		});
// });
// }

// init();
