/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'todo-box': "url('https://img.freepik.com/free-vector/abstract-black-friday-sale-promo-banner-grunge-style_1017-40684.jpg?size=626&ext=jpg&ga=GA1.1.1966780644.1688574031&semt=ais')",
      }
    },
  },
  plugins: [],
}

