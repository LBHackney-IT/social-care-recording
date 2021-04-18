import { Formik, Form } from "formik"
import { Field } from "../config/forms.types"
import { AutosaveTrigger } from "../contexts/autosaveContext"
import { generateFlexibleSchema } from "../lib/validators"
import FlexibleField from "./FlexibleFields"
import { Person } from "../lib/socialCareApi.types"
import Link from "next/link"
import Banner from "./Banner"
import { generateInitialValues } from "../lib/helpers"

type InitialValue = string | string[]

interface Props {
  fields: Field[]
  person: Person
  initialValues?: InitialValue[]
  onSubmit: (values, any) => void
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
      {({ values, isSubmitting, touched, errors, status }) => (
        <>
          <Form>
            {status && (
              <Banner
                title="There was a problem saving your answers"
                className="lbh-page-announcement--warning"
              >
                <p>Please refresh the page or try again later.</p>
                <p className="lbh-body-xs">{status}</p>
              </Banner>
            )}

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
