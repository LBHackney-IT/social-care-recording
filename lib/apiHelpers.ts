import { getSession } from "./auth"
import { NextApiRequest, NextApiResponse } from "next"

export interface ApiRequestWithSession extends NextApiRequest {
  session
}

/** Gracefully handle 401 and catch 500 errors */
export const apiHandler = handler => async (
  req: ApiRequestWithSession,
  res: NextApiResponse
) => {
  try {
    const session = await getSession({ req })
    if (session) {
      req.session = session
      return await handler(req, res)
    } else {
      res.status(401).json({
        error: "Not authenticated",
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    })
  }
}
