import prisma from "../../../../lib/prisma"
import { NextApiResponse } from "next"
import forms from "../../../../config/forms"
import { getPersonById, addRecordToCase } from "../../../../lib/socialCareApi"
import { apiHandler, ApiRequestWithSession } from "../../../../lib/apiHelpers"

const handler = async (req: ApiRequestWithSession, res: NextApiResponse) => {
  const { id } = req.query

  if (req.method === "POST") {
    const { person } = JSON.parse(req.body)

    const submission = await prisma.submission.update({
      where: {
        id: id.toString(),
      },
      data: {
        submittedAt: new Date(),
      },
    })
    await addRecordToCase(
      submission.answers,
      person,
      req.session.user.email,
      submission.formId
    )
    res.json(submission)
  } else if (req.method === "DELETE") {
    await prisma.submission.update({
      where: {
        id: id.toString(),
      },
      data: {
        discardedAt: new Date(),
      },
    })
    res.send(200)
  } else {
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
  }
}

export default apiHandler(handler)
