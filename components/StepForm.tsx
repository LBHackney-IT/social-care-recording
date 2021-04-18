import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import { AutosaveTrigger } from "../contexts/autosaveContext"
import { generateFlexibleSchema } from "../lib/validators"
import FlexibleField from "./FlexibleFields"
import { Person } from "../lib/socialCareApi.types"
import Link from "next/link"

type InitialValue = string | string[]

interface Props {
  fields: Field[]
  person: Person
  initialValues?: InitialValue[]
  onSubmit: (values) => void
}

const generateInitialValues = (fields, person): any => {
  const initialValues = {}
  fields.map(field => {
    if (field.type === "checkboxes") {
      initialValues[field.id] = []
    } else {
      initialValues[field.id] = person[field.prefill] || ""
    }
  })
  return initialValues
}

const StepForm = ({
  initialValues,
  fields,
  person,
  onSubmit,
}: Props): React.ReactElement => {
  return (
    <Formik
      initialValues={initialValues || generateInitialValues(fields, person)}
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
