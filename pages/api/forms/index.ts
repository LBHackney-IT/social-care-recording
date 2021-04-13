import forms from "../../../config/forms"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    res.json(forms)
  } else {
    res.status(401).json({
      error: "Not authenticated",
    })
  }
}
