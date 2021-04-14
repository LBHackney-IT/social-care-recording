import TextField from "./TextField"
import RadioField from "./RadioField"

const FlexibleField = ({
  values,
  field,
  touched,
  errors,
}): React.ReactElement => {
  if (field.condition && values[field.condition.id] !== field.condition.value)
    return null

  if (field.type === "textarea")
    return (
      <TextField
        name={field.id}
        label={field.question}
        touched={touched}
        errors={errors}
        as="textarea"
        rows={3}
      />
    )

  if (field.type === "radio")
    return (
      <RadioField
        name={field.id}
        label={field.question}
        touched={touched}
        choices={field.choices}
        errors={errors}
      />
    )

  return <p>Unsupported field</p>
}

export default FlexibleField
