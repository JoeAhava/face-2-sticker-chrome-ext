import { Context, createContext, useState } from "react";
import { upload } from "../services/uploadFile";
import useFileUpload from "../hooks/useFileUpload";
enum Theme {
	BLACK = "BLACK",
	NORMAL = "NORMAL",
}

export const AppContext: Context<{
	theme: Theme;
	image: string;
	processingURL: string | null;
	setProcessingURL: any;
	setOutputURL: any;
	outputURL: string | null;
	steps: number;
	width: number;
	height: number;
	prompt: string;
	upscale: boolean;
	upscale_steps: number;
	negative_prompt: string;
	prompt_strength: number;
	ip_adapter_noise: number;
	ip_adapter_weight: number;
	instant_id_strength: number;
	seed?: number;
	setSeed: any;
	setTheme: any;
	setImage: any;
	setSteps: any;
	setWidth: any;
	setHeight: any;
	setPrompt: any;
	setPromptStrength: any;
	setNegativePrompt: any;
	setStrength: any;
	setNoise: any;
	setWeight: any;
	setUpscale: any;
	setUpscaleSteps: any;
	apiKey: string;
	setApiKey: any;
}> = createContext<{
	theme: Theme;
	image: string;
	steps: number;
	width: number;
	seed?: number;
	apiKey: string;
	setApiKey: any;
	setSeed: any;
	height: number;
	prompt: string;
	upscale: boolean;
	upscale_steps: number;
	negative_prompt: string;
	prompt_strength: number;
	ip_adapter_noise: number;
	ip_adapter_weight: number;
	instant_id_strength: number;
	setTheme: any;
	setImage: any;
	setSteps: any;
	setWidth: any;
	setHeight: any;
	setPrompt: any;
	setPromptStrength: any;
	setNegativePrompt: any;
	setStrength: any;
	setNoise: any;
	setWeight: any;
	setUpscale: any;
	setUpscaleSteps: any;
	processingURL: string | null;
	setProcessingURL: any;
	setOutputURL: any;
	outputURL: string | null;
}>({
	theme: Theme.NORMAL,
	image: "",
	steps: 20,
	apiKey: "",
	setApiKey: () => {},
	setSeed: () => {},
	width: 1024,
	height: 1024,
	prompt: "arnold",
	upscale: false,
	upscale_steps: 10,
	negative_prompt: "",
	prompt_strength: 4.5,
	ip_adapter_noise: 0.5,
	ip_adapter_weight: 0.2,
	instant_id_strength: 0.7,
	setTheme: () => { },
	setImage: () => {},
	setSteps: () => {},
	setWidth: () => {},
	setHeight: () => {},
	setPrompt: () => {},
	setPromptStrength: () => {},
	setNegativePrompt: () => {},
	setStrength: () => {},
	setNoise: () => {},
	setWeight: () => {},
	setUpscale: () => {},
	setUpscaleSteps: () => { },
	processingURL:  null,
	setProcessingURL: () => {},
	setOutputURL: () => {},
	outputURL: null,
});

export const AppContextProvider = ({ children }: { children: any }) => {

	const [theme, setTheme] = useState<Theme>(Theme.NORMAL);
	const [steps, setSteps] = useState<number>(20);
	const [width, setWidth] = useState<number>(1024);
	const [height, setHeight] = useState<number>(1024);
	const [prompt, setPrompt] = useState<string>("arnold");
	const [prompt_strength, setPromptStrength] = useState<number>(4.5);
	const [negative_prompt, setNegativePrompt] = useState<string>("");
	const [instant_id_strength, setStrength] = useState<number>(1);
	const [ip_adapter_weight, setWeight] = useState<number>(0.2);
	const [ip_adapter_noise, setNoise] = useState<number>(0.5);
	const [upscale, setUpscale] = useState<boolean>(false);
	const [upscale_steps, setUpscaleSteps] = useState<number>(10);
	const [image, setImage] = useState<string>("")
	const [processingURL, setProcessingURL] = useState<string | null>(null)
	const [outputURL, setOutputURL] = useState<string | null>(null)
	const [seed, setSeed] = useState<number>()
	const [apiKey, setApiKey] = useState<string>("")

	return (
		<AppContext.Provider
			value={{
				theme,
				setTheme,
				apiKey,
				setApiKey,
				seed,
				setSeed,
				processingURL,
				setProcessingURL,
				outputURL,
				setOutputURL,
				image,
				setImage,
				steps,
				setSteps,
				width,
				setWidth,
				height,
				setHeight,
				prompt,
				setPrompt,
				prompt_strength,
				setPromptStrength,
				negative_prompt,
				setNegativePrompt,
				instant_id_strength,
				setStrength,
				ip_adapter_noise,
				setNoise,
				ip_adapter_weight,
				setWeight,
				upscale,
				setUpscale,
				upscale_steps,
				setUpscaleSteps,
			}}
		>
			{{ ...children }}
		</AppContext.Provider>
	);
};
