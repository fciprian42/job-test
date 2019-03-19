module.exports = {
  plugins: {
    'postcss-font-magician': {
      variants: {
        'Roboto': {
          '300': [],
          '400': ['woff, eot, woff2'],
          '700': []
        }
      },
      foundries: ['google']
    }
  }
}