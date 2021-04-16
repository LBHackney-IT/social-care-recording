import * as Yup from "yup"

export const startSchema = Yup.object().shape({
  socialCareId: Yup.number()
    .typeError("ID can only contain numbers")
    .integer("ID can only contain numbers")
    .required("Please provide an ID"),
  formId: Yup.string().required("Please choose a form"),
})

export const generateFlexibleSchema = (fields): any => {
  const shape = {}

  fields.map(field => {
    if (field.type === "checkboxes") {
      shape[field.id] = Yup.array().of(Yup.string())
    } else {
      shape[field.id] = Yup.string()
    }

    // add a required attribute if a field is required and not conditional
    if (field.required && !field.condition) {
      if (field.type === "checkboxes") {
        shape[field.id] = shape[field.id].min(
          1,
          field.error || "Please choose at least one option"
        )
      } else {
        shape[field.id] = shape[field.id].required(
          field.error || "This question is required"
        )
      }
    }
  })

  return Yup.object().shape(shape)
}
