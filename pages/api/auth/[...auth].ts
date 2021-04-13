import cookie from "cookie"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { auth, action = auth[0] } = req.query

  switch (action) {
    case "session":
      res.json(getSession({ req }))
      break

    case "sign-out":
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("hackneyToken", "", {
          maxAge: -1,
          domain: ".hackney.gov.uk",
          path: "/",
        })
      )
      res.end()
      break
  }
}
