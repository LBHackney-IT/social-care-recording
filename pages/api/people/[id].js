import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"

export default async (req, res) => {
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
    res.json(data.residents.find(resident => resident.mosaicId === id))
  } else {
    res.status(401).json({
      error: "Not authenticated",
    })
  }
}
