import prisma from "../../../../lib/prisma"
import { getSession } from "../../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../../config/forms"
import { getPersonById } from "../../../../lib/socialCareApi"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { id } = req.query

      //   1. grab submission
      const submission = await prisma.submission.findUnique({
        where: {
          id: id.toString(),
        },
      })

      if (!submission)
        res.status(404).json({
          error: "Submission not found",
        })

      // 2. grab person
      const person = await getPersonById(submission.socialCareId.toString())

      // 3. grab form
      const form = forms.find(form => form.id === submission.formId)

      res.json({
        ...submission,
        person,
        form,
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
