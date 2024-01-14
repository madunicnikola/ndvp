import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      backgroundColor: '#0B0705',
      secondaryColor: '#FAF3DD',
      buttonColor: '#694E4E',
      blogBgColor: '#2a1506',
      grey: '#eeebeb',
      chocolate: '#301200',
      red: '#ff0000',
      darkRed: '#b20000',
      indigo: '#645188',
      darkIndigo: '#46385f',
      warning: '#cc3300',
    },
    fontFamily: {
      'montserrat': ['Montserrat'],
    },
    extend: {},
  },
  plugins: [],
};

export default config;