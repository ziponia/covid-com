import cheerio from "cheerio"

const htmlToString = (htmlString: string) => {
  const $ = cheerio.load(htmlString)
  return $("p").text()
}
export default htmlToString
