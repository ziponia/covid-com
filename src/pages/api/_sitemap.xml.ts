import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@covid/server/prisma"
import dayjs from "dayjs"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const BASE_URL = process.env.APP_DOMAIN || ""
  const feeds = await prisma.feed.findMany({
    select: {
      id: true,
      updated_at: true,
    },
  })

  let str = ""
  feeds.forEach((feed) => {
    str = str.concat(`
          <url>
            <loc>${BASE_URL}/feed/${feed.id}</loc>
            <lastmod>${dayjs(feed.updated_at).format("YYYY-MM-DD")}</lastmod>
          </url>
      `)
  })

  res.setHeader("Content-Type", "application/xml")

  res.send(
    `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${str}
    </urlset>
  `.trim(),
  )
}

export default handler
