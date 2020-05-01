module.exports = {
    devServer: {
      proxy: {
        "/express/": {
          target: "http://192.168.0.24:13000",
        }
      }
    }
  }