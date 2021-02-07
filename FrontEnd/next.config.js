// const path = require('./src/assets/svg');
// const withImages = require('next-images')

// module.exports = withImages({
//   exclude: path.resolve(__dirname, 'src/assets/svg'),
//   webpack(config, options) {
//     return config
//   }
// })

const withImages = require('next-images')

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "ico", "webp", "jp2", "avif"],
  webpack(config, options) {
    return config
  }
})