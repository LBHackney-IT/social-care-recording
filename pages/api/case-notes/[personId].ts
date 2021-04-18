import { NextApiRequest, NextApiResponse } from "next"
import { getPersonById } from "../../../lib/socialCareApi"
import { apiHandler } from "../../../lib/apiHelpers"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //   handle new case note
  } else {
    let { personId } = req.query

    const person = await getPersonById(personId.toString())

    res.json({
      person,
    })
  }
}

export default apiHandler(handler)
