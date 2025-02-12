import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins'],
			},
			colors: {
				primary: '#272724',
				ring: '#2563eb',
				background: '#ffffff',
				foreground: '#16404D',
				card: '#F8F9FA',
				accent: '#DDE2E5',
			},
		},
	},
	plugins: [],
} satisfies Config
