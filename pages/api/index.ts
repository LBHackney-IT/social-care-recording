import forms from "../../config/forms"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"
import { apiHandler } from "../../lib/apiHelpers"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const unfinishedSubmissions = await prisma.submission.findMany({
    where: {
      submittedAt: null,
      discardedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      revisions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      },
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
