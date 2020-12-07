module.exports = {
  // publicPath: '/web/',
  devServer: {
    // port: 8001,
    proxy:
      'http://192.168.4.2:8080/'
  }
}
