/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-pink': '#FFD1DC',
                'pastel-blue': '#AEC6CF',
                'soft-bg': '#FDFBF7',
                'dark-text': '#2C3E50'
            }
        },
    },
    plugins: [],
}