import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import forms from "../../../config/forms"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (session) {
      let { id } = req.query

      //   1. grab submission
      const submission = await prisma.submission.findUnique({
        where: {
          id,
        },
      })

      // 2. grab person
      const res2 = await fetch(
        `${process.env.SOCIAL_CARE_API_ENDPOINT}/residents?mosaic_id=${submission.socialCareId}`,
        {
          headers: {
            "x-api-key": process.env.SOCIAL_CARE_API_KEY,
          },
        }
      )
      const data = await res2.json()
      const person = data.residents.find(
        resident => resident.mosaicId === submission.socialCareId
      )

      // 3. grab form
      const form = forms.find(form => form.id === submission.formId)

      res.json({
        person,
        form,
        submission,
      })
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
