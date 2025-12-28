/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'charcoal': '#121212',
                'electric-indigo': '#6366f1',
            }
        },
    },
    plugins: [],
}
