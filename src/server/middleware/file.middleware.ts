import { AppApiRequest } from "@covid/_app.interface"
import Formidable from "formidable"
import { NextApiResponse } from "next"
import { NextHandler } from "next-connect"

const form = new Formidable.IncomingForm()

const parseMultipartForm = async (
  req: AppApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const contentType = req.headers["content-type"]
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields
        req.files = files
      }
      next() // continues to the next middleware or to the route
    })
  } else {
    next()
  }
}

export default parseMultipartForm
