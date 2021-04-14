import prisma from "../../../../lib/prisma"
import { getSession } from "../../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../../config/forms"
import { getPersonById } from "../../../../lib/socialCareApi"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { id, stepId } = req.query

      res.json({
        message: "testing",
      })
    } else {
      res.status(401).json({
        error: "Not authenticated",
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
    })
  }
}
