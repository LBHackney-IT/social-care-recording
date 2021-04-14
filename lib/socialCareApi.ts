export const getPersonById = async (id: string) => {
  try {
    const res2 = await fetch(
      `${process.env.SOCIAL_CARE_API_ENDPOINT}/residents?mosaic_id=${id}`,
      {
        headers: {
          "x-api-key": process.env.SOCIAL_CARE_API_KEY,
        },
      }
    )
    const data = await res2.json()
    return data.residents.find(resident => resident.mosaicId === String(id))
  } catch (e) {
    console.error(e)
    return false
  }
}
