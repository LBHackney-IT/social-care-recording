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
        <div className="govuk-form-group lbh-form-group">
          <label htmlFor="socialCareId" className="govuk-label lbh-label">
            Social care ID
          </label>
          <Field
            name="socialCareId"
            id="socialCareId"
            className="govuk-input lbh-input govuk-input--width-10"
          />
        </div>

        <div className="govuk-form-group lbh-form-group">
          <label htmlFor="formId" className="govuk-label lbh-label">
            What do you want to start?
          </label>
          <Field
            name="formId"
            as="select"
            id="formId"
            className="govuk-select lbh-select"
          >
            {formOptions.map(option => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </Field>
        </div>

        <button className="govuk-button lbh-button" disabled={isSubmitting}>
          Start
        </button>
      </Form>
    )}
  </Formik>
)

export default StartForm
