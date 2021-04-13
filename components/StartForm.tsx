import { Formik, Form, Field } from "formik"
import { startSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"

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
    {({ isSubmitting }) => (
      <Form>
        <label htmlFor="socialCareId">Social care ID</label>
        <Field name="socialCareId" id="socialCareId" />

        <label htmlFor="formId">What do you want to start?</label>
        <Field name="formId" as="select" id="formId">
          {formOptions.map(option => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </Field>

        <button disabled={isSubmitting}>Start</button>
      </Form>
    )}
  </Formik>
)

export default StartForm
