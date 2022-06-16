/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pink: "#FF4588",
                lime: "#B7FF5C",
                orange: "#FF9345",
            },
        },
    },
    plugins: [],
};
