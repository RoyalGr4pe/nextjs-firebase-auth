import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./components/**/*.{ts,tsx,js,jsx,mdx}',
		'./app/**/*.{ts,tsx,js,jsx,mdx}',
		'./src/**/*.{ts,tsx,js,jsx,mdx}',
	],
    theme: {
        extend: {
            colors: {
                userBg: "#000011",
                darkGray: "#1A1A1A",
            },
        },
    },
    plugins: []
} satisfies Config;

export default config;