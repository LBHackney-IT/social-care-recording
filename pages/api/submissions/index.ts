import prisma from "../../../lib/prisma"
import { NextApiResponse } from "next"
import { startSchema } from "../../../lib/validators"
import { apiHandler, ApiRequestWithSession } from "../../../lib/apiHelpers"

const handler = async (req: ApiRequestWithSession, res: NextApiResponse) => {
  const { formId, socialCareId } = JSON.parse(req.body)

  await startSchema.validate({ formId, socialCareId })

  const newSubmission = await prisma.submission.create({
    data: {
      formId,
      socialCareId: Number(socialCareId),
      createdBy: req.session.user.email,
    },
  })
  res.json(newSubmission)
}

export default apiHandler(handler)
