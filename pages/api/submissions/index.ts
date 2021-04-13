import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { formId, socialCareId } = req.body

      const newSubmission = await prisma.submission.create({
        data: {
          formId,
          socialCareId,
          createdBy: session.email,
        },
      })
      res.json(newSubmission)
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
