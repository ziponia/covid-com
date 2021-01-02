module.exports = {
  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/",
      },
    ]
  },
}
