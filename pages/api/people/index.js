import prisma from "../../../lib/prisma"
import { getSession } from "../../../lib/auth"

export default async (req, res) => {
  const session = await getSession()

  if (session) {
    res.send("OK")
  } else {
    res.status(401).send("Not authenticated")
  }
}
