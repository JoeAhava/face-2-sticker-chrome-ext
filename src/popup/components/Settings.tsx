import React, { useContext } from "react";
import {
	Fieldset,
	Legend,
	Field,
	Input,
	Label,
	Description,
	Select,
	Textarea,
} from "@headlessui/react";
import { MdChevronRight } from "react-icons/md";
import { clsx } from "clsx";
import { AppContext } from "../store";

export default function Settings() {
	const {
		prompt, setPrompt, negative_prompt,
		setNegativePrompt, instant_id_strength,
		setStrength, ip_adapter_noise, setNoise,
		ip_adapter_weight, setWeight,
		width, setWidth,
		height, setHeight,
		steps, setSteps,
		seed, setSeed,
		prompt_strength, setPromptStrength,
		apiKey, setApiKey,
	} = useContext(AppContext)

	return (
		<div className="max-h-96 overflow-y-auto rounded-xl bg-white dark:bg-gray-600 shadow-md border-gray-200 dark:border-none border-[0.1px]">
			<Fieldset className="max-h-full space-y-6 bg-white/5 p-6 sm:p-10 ">
				<Legend className="text-base/7 font-semibold text-white">
					API Key
				</Legend>
				<Field>
					<Label className="text-sm/6 font-medium text-white">
						apiKey
					</Label>
					<Input
						type="text"
						value={apiKey}
						onChange={(e) => setApiKey(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>

				<Legend className="text-base/7 font-semibold text-white">
					Parameters
				</Legend>
				<Field>
					<Label className="text-sm/6 font-medium text-white">
						prompt
					</Label>
					<Input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-white">
						negative_prompt
					</Label>
					<Input
						type="text"
						value={negative_prompt}
						onChange={(e) => setNegativePrompt(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						width
					</Label>
					<Input
						type="number"
						step={1}
						// defaultValue={1024}
						value={width}
						onChange={(e) => setWidth(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						height
					</Label>
					<Input
						type="number"
						step={1}
						defaultValue={1024}
						value={height}
						onChange={(e) => setHeight(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						steps
					</Label>
					<Input
						type="number"
						step={1}
						defaultValue={20}
						value={steps}
						onChange={(e) => setSteps(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						seed
					</Label>
					<Input
						type="number"
						step={1}
						value={seed}
						onChange={(e) => setSeed(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						prompt_strength
					</Label>
					<Input
						type="number"
						step={0.1}
						defaultValue={7}
						value={prompt_strength}
						onChange={(e) => setPromptStrength(e.target?.value)}
						className={clsx(
							"mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
						)}
					/>
				</Field>
				<Field>
					<Label className="text-sm/6 font-medium text-gray-600 dark:text-white">
						instant_id_strength
					</Label>
					<div className=" flex items-center space-x-2">
						<Input
							type="number"
							step={0.01}
							defaultValue={1}
							max={1.0}
							value={instant_id_strength}
							onChange={(e) => setStrength(e.target?.value)}
							className={clsx(
								"mt-3 max-w-20 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
								"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
							)}
						/>
						<Input
							type="range"
							defaultValue={1}
							step={0.01}
							min={0}
							max={1}
							className={"flex-grow"}
						/>
					</div>
				</Field>
			</Fieldset>
		</div>
	);
}
