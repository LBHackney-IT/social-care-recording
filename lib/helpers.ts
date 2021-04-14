import { Form, Step } from "../config/forms.types"

export interface Theme {
  name: string
  steps: Step[]
}

export const groupByTheme = (form: Form): Theme[] =>
  form.steps.reduce(function (groups, step) {
    const name = step.theme
    if (!groups.find(group => group.name === name)) {
      groups.push({
        name: name,
        steps: [],
      })
    }
    const group = groups.find(group => group.name === name)
    group.steps.push(step)
    return groups
  }, [])

export const formsToChoices = (
  forms: Form[]
): {
  value: string
  label: string
}[] =>
  forms.map(form => ({
    value: form.id,
    label: form.name,
  }))
