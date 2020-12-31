module.exports = {
  async rewrites() {
    return [
      {
        source: "/post",
        destination: "/",
      },
      {
        source: "/post/:idx",
        destination: "/",
      },
    ]
  },
}
