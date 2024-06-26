import React, { useEffect, useReducer, useState } from "react";
import useFetchImg from "../hooks/useFetchImg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useStickerize } from "../hooks/useStickerize";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { MdSettings } from "react-icons/md";
import Settings from "./Settings";
import {
	Windows,
	tabs,
	windows,
	storage,
	Tabs,
	browserAction,
	runtime,
} from "webextension-polyfill";
import Rating from "./Rating";
export default function FileUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [selectedImg, setSelectedImg] = useState<string | null>(null);

	const { loadingSticker, errSticker, sticker } = useStickerize(file);
	const [pollingURL, setPollingURL] = useState<string | null>(null);

	// const { loading: loadingImg, error: errorImg, img } = useFetchImg(pollingURL);
	const [loadingImg, setLoadingImg] = useState<boolean>(false);
	const [errorImg, setErrorImg] = useState<any>(false);
	const [img, setImg] = useState<string>();

	const [newWindow, setNewWindow] = useState<Windows.Window>();
	const [tab, setTab] = useState<number>();
	const [window, setWindow] = useState<number>();
	const [rating, setRating] = useState<number>(0);

	//! TODO drang and drop is not working as expected | DEBUG
	const handleDrop = (event: any) => {
		event.preventDefault();
		const droppedFiles = event.dataTransfer.files;
		if (droppedFiles.length > 0) {
			const newFiles: Array<File> = Array.from(droppedFiles);
			setFile(newFiles[0]);
		}
	};

	const reset = () => {
		setFile(null);
		setSelectedImg(null);
	};

	const handleImgSelect = (event: any) => {
		reset();
		if (event.target?.files && event.target?.files[0]) {
			const f: File = event.target?.files[0];
			if (["jpeg", "jpg", "png"].includes(f.type.split("/")[1])) {
				setFile(f);
				setSelectedImg(URL.createObjectURL(f as Blob));
			} else {
				toast("Only JPEG, JPG and PNG file types allowed", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
					type: "error",
				});
			}
		}
	};

	useEffect(() => {
		if (errSticker || errorImg)
			toast(errSticker || errorImg, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Bounce,
				type: "error",
			});
	}, [errSticker, errorImg]);

	useEffect(() => {
		// const checkTab = async () => {
		// 	const t = await storage.local.get("tabID");
		// 	const tabID = Number(t);
		// 	if (tabID) {
		// 		setTab(tabID);
		// 		console.log("Tab ID", t);
		// 		return tabID;
		// 	}
		// 	return null;
		// };
		const loadTab = () => {
			windows
				.create({
					type: "normal",
				})
				.then((win) => {
					tabs
						.create({
							url: "https://replicate.delivery/pbxt/xvqWvV3152KsEZh4fWdR9yMeXWs2SO1K9Ozgh3f91vHF3j2kA/ComfyUI_00001_.png",
							windowId: win.id,
							pinned: true,
						})
						.then(async (tab) => {
							const store = await storage.local.set({
								tabID: tab.id,
								windowID: tab.windowId,
							});
							setTab(tab?.id);
							return store;
						});
				});
		};

		loadTab();

		// checkTab().then(async (t) => {
		// 	console.log("Tab checking ...", t);
		// 	if (!!t && !img) {
		// 		await tabs.update(t, {
		// 			active: true,
		// 		});
		// 	} else if (!!t && !!img) {
		// 		await tabs.update(t, {
		// 			url: img,
		// 			active: true,
		// 		});
		// 	} else {
		// 		await loadTab();
		// 	}
		// 	// if (t?.id && img) {
		// 	// await tabs.update(t?.id, {
		// 	// 	url: img,
		// 	// 	active: true,
		// 	// });
		// 	// }
		// });
		// .catch((err) => loadTab());
	}, []);

	useEffect(() => {
		runtime.onInstalled.addListener(async () => {
			await storage.local.clear();
		});
		runtime.onMessage.addListener(async (message) => {
			console.log("popup message received", message);
			if (message?.to === "popup") {
				switch (message?.action) {
					case "success": {
						setImg(message?.payload);
						setLoadingImg(false);
						const tabID = await storage.local.get("tabID");
						const winID = await storage.local.get("windowID");
						const wid = Number.parseInt(winID?.windowID?.toString());
						const tid = Number.parseInt(tabID?.tabID?.toString());
						if (tid && wid) {
							setTab(tid);
							setWindow(wid);
							const newTab = await tabs.create({
								url: message?.payload,
								windowId: wid,
								active: true,
							});
							console.log("Display img on newTab", newTab);
						}
						console.log("tab and win", tabID, winID, "tid, wid", tid, wid);
						// if (tab) {
						// 	const tabInstance = await tabs.query({ windowId: winID });
						// 	if (tabInstance.find((t) => t.id === tabID)) {
						// 	}
						// }
						break;
					}
					case "processing": {
						setLoadingImg(true);
						break;
					}
					case "error": {
						setLoadingImg(false);
						setErrorImg(
							`${message?.payload?.data?.detail || message?.payload}, ${
								message?.payload?.status == 401
									? "Please set it under the settings icon"
									: ""
							}`,
						);
						break;
					}
					default:
						break;
				}
			}
		});
		// 	(async () => {
		// 	const polling_url = await storage.local.get("polling_url");
		// 	if (polling_url) {
		// 		setPollingURL(
		// 			polling_url.toString().length > 0 ? polling_url.toString() : null,
		// 		);
		// 		// tabs.get(tab?.id).then((t) => {
		// 		// 	t.url = polling_url.toString();
		// 		// });
		// 	}
		// })();
	}, []);

	useEffect(() => {
		storage.local.get("windowID").then(async (win) => {
			const wid = Number.parseInt(win?.windowID?.toString());
			if (wid) {
				setWindow(wid);
				const newTab = await tabs.create({
					url:
						rating > 3
							? "https://www.google.com"
							: "https://www.youtube.com/hashtag/funnyvideo",
					windowId: wid,
					active: true,
				});
				console.log("Display rating on newTab", newTab);
			}
		});
	}, [rating]);

	return (
		<div className="md:w-96 relative flex flex-col">
			<div className="absolute top-0 right-0">
				<Disclosure>
					<DisclosureButton className="py-2  w-full flex items-center justify-end">
						<MdSettings size={"2.5em"} color="gray" className="" />
					</DisclosureButton>
					<DisclosurePanel className="rounded">
						<Settings />
					</DisclosurePanel>
				</Disclosure>
			</div>
			<div className="flex flex-col space-y-4 items-center justify-center w-full md:max-w-96 mt-12 ">
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					bodyClassName={"right-4 bottom-4"}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
				{/* Upload Input Button */}
				{selectedImg && (
					<img
						src={URL.createObjectURL(file as Blob)}
						alt="selected"
						className="max-w-md h-52 m-2"
					/>
				)}
				{(loadingSticker || loadingImg) && (
					<div className=" flex-grow w-auto py-16">
						<div
							className=" h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
					</div>
				)}

				{!loadingSticker && !loadingImg && (
					<label
						htmlFor="uploadFile1"
						className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif] p-6"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-11 mb-2 fill-gray-500"
							viewBox="0 0 32 32"
						>
							<path
								d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
								data-original="#000000"
							/>
							<path
								d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
								data-original="#000000"
							/>
						</svg>
						Upload file
						<input
							type="file"
							id="uploadFile1"
							className="hidden"
							onChange={handleImgSelect}
							onDrop={handleDrop}
							onDragOver={(e) => e.preventDefault()}
						/>
						<p className="text-xs font-medium text-gray-400 mt-2 px-6">
							PNG, JPG and JPEG are Allowed.
						</p>
					</label>
				)}
				{/* {file && ( */}
				<div className=" w-full flex items-center space justify-center py-6 px-12">
					<Rating value={rating} setValue={setRating} />
					{/* {!loadingSticker && !loadingImg && !errSticker && !img && (
						<>
							<img
								src="https://replicate.delivery/pbxt/xvqWvV3152KsEZh4fWdR9yMeXWs2SO1K9Ozgh3f91vHF3j2kA/ComfyUI_00001_.png"
								alt="face to stickerize"
								className="w-full max-h-80"
							/>
						</>
					)} */}
					{/* {!loadingSticker && !loadingImg && !errSticker && img && (
						<>
							<img
								src={img}
								alt="face to stickerize"
								className="w-full max-h-80"
							/>
							<button
								onClick={(e) => setFile(null)}
								className="outline outline-red-500 text-red-500 font-bold rounded px-3 py-1"
							>
								Remove
							</button>
						</>
					)} */}
				</div>
			</div>
		</div>
	);
}
