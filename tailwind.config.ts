import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./components/**/*.{ts,tsx,js,jsx,mdx}',
		'./app/**/*.{ts,tsx,js,jsx,mdx}',
		'./src/**/*.{ts,tsx,js,jsx,mdx}',
	],
} satisfies Config;

export default config;