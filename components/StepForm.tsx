import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import FlexibleField from "./FlexibleFIeld"

interface Props {
  fields: Field[]
  onSubmit: (values) => void
}

const StepForm = ({ fields, onSubmit }: Props): React.ReactElement => {
  let initialValues = {}

  fields.map(field => (initialValues[field.id] = ""))

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, isSubmitting, touched, errors }) => (
        <Form>
          {fields.map(field => (
            <FlexibleField
              key={field.id}
              field={field}
              touched={touched}
              errors={errors}
              values={values}
            />
          ))}

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            Continue
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default StepForm
