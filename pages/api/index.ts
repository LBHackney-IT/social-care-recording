import forms from "../../config/forms"
import { getSession } from "../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { apiHandler } from "../../lib/apiHelpers"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const unfinishedSubmissions = await prisma.submission.findMany({
    where: {
      submittedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  res.json({
    forms,
    unfinishedSubmissions: unfinishedSubmissions.map(submission => ({
      ...submission,
      form: forms.find(form => form.id === submission.formId),
    })),
  })
}

export default apiHandler(handler)
