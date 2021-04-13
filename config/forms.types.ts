export interface Choice {
  value: string
  label: string
}

enum FieldTypes {
  Text = "text",
  Textarea = "textarea",
  Radio = "radio",
  Checkbox = "checkbox",
}

export interface Field {
  id: string
  question: string
  type: FieldTypes
  hint?: string
  error?: string
  choices?: Choice[]
  classNames?: string
}

export interface Step {
  id: string
  name: string
  fields: Field[]
}

export interface Form {
  id: string
  name: string
  steps: Step[]
}
