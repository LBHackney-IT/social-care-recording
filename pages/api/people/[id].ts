import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    const { id } = req.query

    const res2 = await fetch(
      `${process.env.SOCIAL_CARE_API_ENDPOINT}/residents?mosaic_id=${id}`,
      {
        headers: {
          "x-api-key": process.env.SOCIAL_CARE_API_KEY,
        },
      }
    )
    const data = await res2.json()
    const resident = data.residents.find(resident => resident.mosaicId === id)
    if (!resident)
      res.status(404).json({
        error: "Resident not found",
      })
    res.json(resident)
  } else {
    res.status(401).json({
      error: "Not authenticated",
    })
  }
}
