import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import { AutosaveTrigger } from "../contexts/autosaveContext"
import { generateFlexibleSchema } from "../lib/validators"
import FlexibleField from "./FlexibleFields"
import Link from "next/link"

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
}: Props): React.ReactElement => {
  return (
    <Formik
      initialValues={initialValues || generateInitialValues(fields)}
      validationSchema={generateFlexibleSchema(fields)}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, touched, errors, status, setStatus }) => (
        <>
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

            <AutosaveTrigger />

            <button className="govuk-button lbh-button" disabled={isSubmitting}>
              Save changes
            </button>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default StepForm
