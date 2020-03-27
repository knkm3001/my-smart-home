module.exports = {
    devServer: {
      proxy: {
        "/api/": {
          target: "http://192.168.0.24:13000",
        },
        "/raspi-api/": {
            target: "http://192.168.0.5:5000",
          },
      }
    }
  }