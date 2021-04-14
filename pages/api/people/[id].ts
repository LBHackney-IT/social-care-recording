import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"
import { NextApiRequest, NextApiResponse } from "next"
import { getPersonById } from "../../../lib/socialCareApi"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    const { id } = req.query

    const person = await getPersonById(id as string)

    if (!person)
      res.status(404).json({
        error: "Person not found",
      })
    res.json(person)
  } else {
    res.status(401).json({
      error: "Not authenticated",
    })
  }
}
