import * as Yup from "yup"
import { Field } from "../config/forms.types"

export const startSchema = Yup.object().shape({
  socialCareId: Yup.number()
    .typeError("ID can only contain numbers")
    .integer("ID can only contain numbers")
    .required("Please provide an ID"),
  formId: Yup.string().required("Please choose a form"),
})

export const caseNoteSchema = Yup.object().shape({
  type: Yup.string().required("Please give a type"),
  subtype: Yup.string().when("type", {
    is: val => val !== "something-else",
    then: Yup.string().required("Please give a type"),
  }),
  whatHappened: Yup.string().required("Please describe what happened"),
  actions: Yup.array().of(Yup.string()),
  files: Yup.array().of(Yup.mixed()).nullable(),
})

export const generateFlexibleSchema = (fields: Field[]): any => {
  const shape = {}

  fields.map(field => {
    if (field.type === "repeaterGroup") {
      // recursively generate a schema for subfields of a repeater geoup
      shape[field.id] = Yup.array().of(generateFlexibleSchema(field.subfields))
    } else if (field.type === "checkboxes" || field.type === "repeater") {
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
      } else if (field.type === "repeater" || field.type === "repeaterGroup") {
        shape[field.id] = shape[field.id].min(
          1,
          field.error || `Please add at least one ${field.itemName || "item"}`
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
