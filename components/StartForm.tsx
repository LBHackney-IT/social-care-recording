import { useCallback } from "react"
import { Formik, Form } from "formik"
import { startSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import SelectField from "./SelectField"
import { formsToChoices } from "../lib/helpers"
import Banner from "./Banner"
import { useRouter } from "next/router"

interface Props {
  forms: FormType[]
  onSubmit: (values, any) => void
}

const StartForm = ({ forms, onSubmit }: Props): React.ReactElement => {
  const formsToChoicesCallback = useCallback(formsToChoices, [forms])

  const { query } = useRouter()

  const choices = formsToChoicesCallback(forms)

  return (
    <Formik
      initialValues={{
        socialCareId: query.social_care_id || "",
        formId: choices[0].value,
      }}
      validationSchema={startSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors, status }) => (
        <Form>
          {status && (
            <Banner
              title="There was a problem submitting the form"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}

          {!query.social_care_id && (
            <TextField
              name="socialCareId"
              label="Social care ID"
              hint="For example, 12345678"
              touched={touched}
              errors={errors}
              className="govuk-input--width-10"
            />
          )}

          <SelectField
            name="formId"
            label="What do you want to start?"
            touched={touched}
            errors={errors}
            choices={choices}
          />

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            Continue
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default StartForm
