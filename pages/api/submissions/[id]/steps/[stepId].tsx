import prisma from "../../../../../lib/prisma"
import { getSession } from "../../../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../../../config/forms"
import { getPersonById } from "../../../../../lib/socialCareApi"
import { pushUnique } from "../../../../../lib/helpers"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { id, stepId } = req.query

      // 1. grab submission
      const submission = await prisma.submission.findUnique({
        where: {
          id,
        },
      })

      if (req.method === "PATCH") {
        let values = JSON.parse(req.body)

        const updatedSubmission = await prisma.submission.update({
          where: {
            id,
          },
          data: {
            data: values,
            editedBy: pushUnique(submission.editedBy, session.user.email),
            completedSteps: pushUnique(submission.completedSteps, stepId),
          },
        })

        res.json({
          submission: updatedSubmission,
        })
      } else {
        // 2. grab person
        const person = await getPersonById(submission.socialCareId)

        // 3. grab this particular step from the form
        const step = forms
          .find(form => form.id === submission.formId)
          .steps.find(step => step.id === stepId)

        res.json({
          ...step,
          person,
          submission,
        })
      }
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
