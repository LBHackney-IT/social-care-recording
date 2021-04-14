import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import TextField from "./TextField"
import RadioField from "./RadioField"

interface Props {
  fields: Field[]
  onSubmit: (values) => void
}

const FlexibleField = ({ field, touched, errors }): React.ReactElement => {
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
    //    return <>{JSON.stringify(field.choices)}</>

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

const StepForm = ({ fields, onSubmit }: Props): React.ReactElement => (
  <Formik initialValues={{}} onSubmit={onSubmit}>
    {({ isSubmitting, touched, errors }) => (
      <Form>
        {fields.map(field => (
          <FlexibleField
            key={field.id}
            field={field}
            touched={touched}
            errors={errors}
          />
        ))}

        <button className="govuk-button lbh-button" disabled={isSubmitting}>
          Continue
        </button>
      </Form>
    )}
  </Formik>
)

export default StepForm
