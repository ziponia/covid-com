import { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.send({
    version: "1.0",
  })
}

export default handler
