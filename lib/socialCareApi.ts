import { Person } from "./socialCareApi.types"

/** Get core data about a person by their social care ID */
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

/** Add a new record to a case, including person data, the form and the person who wrote it */
export const addRecordToCase = async (
  data: any,
  person: Person,
  worker: string,
  formName: string
) => {
  try {
    const res = await fetch(`${process.env.SOCIAL_CARE_API_ENDPOINT}/cases`, {
      headers: {
        "x-api-key": process.env.SOCIAL_CARE_API_KEY,
      },
      method: "POST",
      // TODO: what should these values be?
      body: JSON.stringify({
        formName: formName,
        formNameOverall: "ASC_case_note",
        firstName: person.firstName,
        lastName: person.firstName,
        workerEmail: worker,
        dateOfBirth: person.dateOfBirth,
        personId: Number(person.mosaicId),
        contextFlag: person.ageContext,
        caseFormData: JSON.stringify({
          case_note_title: formName,
          case_note_description: JSON.stringify(data),
        }),
      }),
    })
    return await res.json()
  } catch (e) {
    return null
  }
}
