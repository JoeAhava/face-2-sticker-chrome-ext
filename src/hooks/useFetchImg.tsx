import { useContext, useEffect, useState } from "react";
import { getUploadedImg } from "../services/getUploadedImg";
import { AppContext } from "../store";

export default function useFetchImg(imgURL: string | null) {
	const { apiKey} = useContext(AppContext)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [img, setImg] = useState<string | undefined>(undefined);
	const [intervalID, setIntervalID] = useState<NodeJS.Timer | undefined>(
		undefined,
	);

	useEffect(() => {
		let pollForUpdates: NodeJS.Timer;
		if (imgURL && intervalID === undefined) {
			setLoading(true);
			pollForUpdates = setInterval(() => {
				(async () => {
					const data = await getUploadedImg(imgURL, apiKey);
					setImg(data.length > 0 ? data : "");
					console.log("Polling ...");
					// setLoading(false);
				})();
			}, 3500);
			setIntervalID(pollForUpdates);
			console.log("Interval set");
		}
		if (img !== undefined && img !== "") {
			console.log("Interval cleared");
			clearInterval(intervalID);
			setLoading(false);
		}
		return () => {
			if (img !== undefined && img !== "") {
				console.log("Interval cleared");
				clearInterval(intervalID);
				setLoading(false);
			}
		};
	}, [imgURL, img, intervalID, apiKey]);

	return { loading, img, error };
}
