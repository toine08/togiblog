/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
	  extend: {
		colors: {
		  'greenfluo': '#02e802',
		  'bluefluo': '##0324ff',
		}
	  },
	},
	plugins: [
		require('@tailwindcss/typography')
	]
  }
