import prisma from "../../../../../lib/prisma"
import { getSession } from "../../../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../../../config/forms"
import { getPersonById } from "../../../../../lib/socialCareApi"
import { pushUnique } from "../../../../../lib/helpers"
import { generateFlexibleSchema } from "../../../../../lib/validators"
import {
  apiHandler,
  ApiRequestWithSession,
} from "../../../../../lib/apiHelpers"

const handler = async (req: ApiRequestWithSession, res: NextApiResponse) => {
  let { id, stepId } = req.query

  // 1. grab submission
  const submission = await prisma.submission.findUnique({
    where: {
      id: id.toString(),
    },
  })

  // 2. grab this particular step from the form
  const form = forms.find(form => form.id === submission.formId)
  const step = form.steps.find(step => step.id === stepId)

  if (!step)
    res.status(404).json({
      error: "Step not found",
    })

  if (req.method === "PATCH") {
    let values = JSON.parse(req.body)

    let result = await generateFlexibleSchema(step.fields).validate(values)

    let updatedAnswers = submission.answers || {}
    updatedAnswers[stepId.toString()] = values

    const updatedSubmission = await prisma.submission.update({
      where: {
        id: id.toString(),
      },
      data: {
        answers: updatedAnswers,
        editedBy: pushUnique(submission.editedBy, req.session.user.email),
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
      ...submission,
      // include the answers for this step
      stepAnswers: submission.answers[stepId.toString()],
      form,
      step,
      person,
    })
  }
}

export default apiHandler(handler)
