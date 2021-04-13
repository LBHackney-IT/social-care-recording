import { Formik, Form, Field } from "formik"

interface Props {
  formOptions: {
    id: string
    name: string
  }[]
  handleSubmit: (values) => void
}

const StartForm = ({
  formOptions,
  handleSubmit,
}: Props): React.ReactElement => (
  <Formik
    initialValues={{
      socialCareId: "",
      formId: "",
    }}
    onSubmit={handleSubmit}
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
