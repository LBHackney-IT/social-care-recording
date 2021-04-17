import { Person } from "./socialCareApi.types"

export const getPersonById = async (id: string): Promise<Person | null> => {
  try {
    const res = await fetch(
      `${process.env.SOCIAL_CARE_API_ENDPOINT}/residents?mosaic_id=${id}`,
      {
        headers: {
          "x-api-key": process.env.SOCIAL_CARE_API_KEY,
        },
      }
    )
    const data = await res.json()
    const person = data.residents?.find(
      resident => resident.mosaicId === String(id)
    )
    if (!person) return null
    return person
  } catch (e) {
    return null
  }
}
