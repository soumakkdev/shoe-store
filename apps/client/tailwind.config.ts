import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins'],
			},
			colors: {
				primary: '#EFB036',
				ring: '#4C7B8B',
				background: '#ffffff',
				foreground: '#16404D',
				card: '#F8F9FA',
			},
		},
	},
	plugins: [],
} satisfies Config
