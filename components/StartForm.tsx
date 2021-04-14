import { Formik, Form, Field } from "formik"
import { startSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import SelectField from "./SelectField"

interface Props {
  formOptions: FormType[]
  onSubmit: (values) => void
}

const StartForm = ({ formOptions, onSubmit }: Props): React.ReactElement => (
  <Formik
    initialValues={{
      socialCareId: "",
      formId: "",
    }}
    validationSchema={startSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, touched, errors }) => (
      <Form>
        <TextField
          name="socialCareId"
          label="Social care ID"
          hint="For example, 12345678"
          touched={touched}
          errors={errors}
          className="govuk-input--width-10"
        />

        <SelectField
          name="formId"
          label="What do you want to start?"
          touched={touched}
          errors={errors}
          options={formOptions}
        />

        <button className="govuk-button lbh-button" disabled={isSubmitting}>
          Start
        </button>
      </Form>
    )}
  </Formik>
)

export default StartForm
