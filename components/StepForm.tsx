import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import FlexibleField from "./FlexibleField"
import Autosave from "./Autosave"
import { generateFlexibleSchema } from "../lib/validators"

type InitialValue = string | string[]

interface Props {
  fields: Field[]
  initialValues?: InitialValue[]
  onSubmit: (values) => void
}

const generateInitialValues = (fields): any => {
  const initialValues = {}
  fields.map(
    field => (initialValues[field.id] = field.type === "checkboxes" ? [] : "")
  )
  return initialValues
}

const StepForm = ({
  initialValues,
  fields,
  onSubmit,
}: Props): React.ReactElement => (
  <Formik
    initialValues={initialValues || generateInitialValues(fields)}
    validationSchema={generateFlexibleSchema(fields)}
    onSubmit={onSubmit}
  >
    {({ values, isSubmitting, touched, errors }) => (
      <Form>
        {/* <Autosave /> */}

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
