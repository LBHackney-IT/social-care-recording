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

export const addRecordToCase = async (
  person: Person,
  data: any,
  worker: string,
  formName: string
): Promise<Person | null> => {
  try {
    const res = await fetch(`${process.env.SOCIAL_CARE_API_ENDPOINT}/cases`, {
      headers: {
        "x-api-key": process.env.SOCIAL_CARE_API_KEY,
      },
      method: "POST",
      body: JSON.stringify({
        formName: formName,
        formNameOverall: formName,
        firstName: person.firstName,
        lastName: person.firstName,
        workerEmail: worker,
        dateOfBirth: person.dateOfBirth,
        personId: person.mosaicId,
        contextFlag: person.ageContext,
        caseFormData: JSON.stringify(data),
      }),
    })
    return await res.json()
  } catch (e) {
    return null
  }
}
