const sleep = async (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export default sleep
