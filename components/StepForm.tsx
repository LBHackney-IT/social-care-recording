import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import FlexibleField from "./FlexibleFIeld"
import * as Yup from "yup"

interface Props {
  fields: Field[]
  onSubmit: (values) => void
}

const generateInitialValues = (fields): any => {
  const initialValues = {}
  fields.map(field => (initialValues[field.id] = ""))
  return initialValues
}

const generateSchema = (fields): any => {
  const shape = {}
  fields.map(field => {
    if (field.condition) {
      shape[field.id] = Yup.string()
    } else {
      shape[field.id] = Yup.string().required(
        field.error || "This question is required"
      )
    }
  })
  return Yup.object().shape(shape)
}

const StepForm = ({ fields, onSubmit }: Props): React.ReactElement => (
  <Formik
    initialValues={generateInitialValues(fields)}
    validationSchema={generateSchema(fields)}
    onSubmit={onSubmit}
  >
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
export default StepForm
