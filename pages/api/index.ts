import forms from "../../config/forms"
import { getSession } from "../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      const unfinishedSubmissions = await prisma.submission.findMany({
        where: {
          submittedAt: null,
        },
      })

      res.json({
        forms,
        unfinishedSubmissions,
      })
    } else {
      res.status(401).json({
        error: "Not authenticated",
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.toString(),
    })
  }
}
