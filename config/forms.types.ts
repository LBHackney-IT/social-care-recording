export interface Choice {
  value: string
  label: string
}

export interface Field {
  id: string
  question: string
  type: string
  choices?: Choice[]
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
