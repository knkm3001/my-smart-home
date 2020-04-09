module.exports = {
    devServer: {
      proxy: {
        "/express/": {
          target: "http://192.168.0.24:13000",
        },
        "/raspi/": {
            target: "http://192.168.0.5:5000",
          },
      }
    }
  }