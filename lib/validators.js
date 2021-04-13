import * as Yup from "yup"

export const startSchema = Yup.object().shape({
  socialCareId: Yup.string().required(),
  formId: Yup.string().required(),
})
