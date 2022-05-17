module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'top-wave': "url(top-wave.svg)",
        'bot-wave': "url(bot-wave.svg)",
      }
    },
    colors: {
      bg: '#F4F4F4',
      mainText: '#252525',
      linkText: '#7184E5',
      white: '#ffffff',
      black: '#000000',
      red: '#ff0000'
    },
    screens: {
      '415': '415px',
    }
  },
  plugins: [],
}
