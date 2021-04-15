import { useCallback } from "react"
import { Formik, Form, Field } from "formik"
import { startSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import SelectField from "./SelectField"
import CheckboxField from "./CheckboxField"
import { formsToChoices } from "../lib/helpers"

interface Props {
  forms: FormType[]
  onSubmit: (values) => void
}

const StartForm = ({ forms, onSubmit }: Props): React.ReactElement => {
  const formsToChoicesCallback = useCallback(formsToChoices, [forms])

  const choices = formsToChoicesCallback(forms)

  return (
    <Formik
      initialValues={{
        socialCareId: "",
        formId: choices[0].value,
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
            choices={choices}
          />
          <CheckboxField
            name="check"
            label="Checking what?"
            touched={touched}
            errors={errors}
            choices={choices}
             />

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            Start
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default StartForm
