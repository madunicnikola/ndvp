import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors:{
      backgroundColor: '#0B0705',
      secondaryColor: '#FAF3DD',
      buttonColor: '#694E4E',
      blogBgColor: '#2a1506',
      grey: "#d3d3d3",
      chocolate: '#301200',
      red: '#ff0000',
      darkRed: '#b20000',
      indigo: '#645188',
      darkIndigo: '#46385f',
      warning: '#cc3300',
      mocha: '#3E3232',
      black: '#202020',
      darkBlack: '#000000',
      destructive: '#FF7F7F',
      green: '#00d062',
      lightblue: '#AAD9E6',
      greenButtonDark: '#65B741',
      greenButtonLite: '#C1F2B0',
      grayHover: '#333',
      white: '#fff',
    },
    fontFamily: {
      'montserrat': ['Montserrat'],
    },
    extend: {},
  },
  plugins: [],
};

export default config;