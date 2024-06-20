interface Options {
	image?: string | undefined;
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
}
