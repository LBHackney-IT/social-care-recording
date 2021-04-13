import forms from "../../../config/forms"
import { getSession } from "../../../lib/auth"

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.json(forms)
  }
}
