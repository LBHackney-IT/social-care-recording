export interface Choice {
  value: string
  label: string
}

export interface Field {
  id: string
  question: string
  type: "text" | "textarea" | "radios" | "checkboxes" | "select"
  required: boolean
  hint?: string
  error?: string
  choices?: Choice[]
  prefill?: string
  classNames?: string
  condition?: {
    id: string
    value: string | boolean
  }
}

export interface Step {
  id: string
  name: string
  theme?: string
  fields: Field[]
}

export interface Form {
  id: string
  name: string
  steps: Step[]
}
