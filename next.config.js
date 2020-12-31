module.exports = {
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/",
      },
      {
        source: "/feed/:idx",
        destination: "/",
      },
    ]
  },
}
