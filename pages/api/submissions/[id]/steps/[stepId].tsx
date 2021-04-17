import prisma from "../../../../../lib/prisma"
import { getSession } from "../../../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../../../config/forms"
import { getPersonById } from "../../../../../lib/socialCareApi"
import { pushUnique } from "../../../../../lib/helpers"
import { generateFlexibleSchema } from "../../../../../lib/validators"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { id, stepId } = req.query

      // 1. grab submission
      const submission = await prisma.submission.findUnique({
        where: {
          id: id.toString(),
        },
      })

      // 2. grab this particular step from the form
      const step = forms
        .find(form => form.id === submission.formId)
        .steps.find(step => step.id === stepId)

      if (req.method === "PATCH") {
        let values = JSON.parse(req.body)

        await generateFlexibleSchema(step.fields).validate(values)

        let updatedAnswers = submission.answers || {}
        updatedAnswers[stepId.toString()] = values

        const updatedSubmission = await prisma.submission.update({
          where: {
            id: id.toString(),
          },
          data: {
            answers: updatedAnswers,
            editedBy: pushUnique(submission.editedBy, session.user.email),
            completedSteps: pushUnique(
              submission.completedSteps,
              stepId.toString()
            ),
          },
        })

        res.json({
          submission: updatedSubmission,
        })
      } else {
        // 3. grab person
        const person = await getPersonById(submission.socialCareId.toString())

        res.json({
          ...step,
          person,
          submission: {
            ...submission,
            answers: submission.answers[stepId.toString()],
          },
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
      error: error.toString(),
    })
  }
}
