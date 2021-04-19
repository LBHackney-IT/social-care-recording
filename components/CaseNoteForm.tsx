import { useCallback } from "react"
import { Formik, Form, Field } from "formik"
import { caseNoteSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import RepeaterField from "./RepeaterField"
import Link from "next/link"

interface Props {
  onSubmit: (values, any) => void
}

const CaseNoteForm = ({ onSubmit }: Props): React.ReactElement => {
  return (
    <Formik
      initialValues={{
        whatHappened: "",
        actions: [],
      }}
      validationSchema={caseNoteSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form>
          <TextField
            name="whatHappened"
            label="What happened?"
            as="textarea"
            rows={3}
            touched={touched}
            errors={errors}
          />

          <RepeaterField
            label="Actions"
            name="actions"
            touched={touched}
            errors={errors}
            itemName="action"
          />

          <button className="govuk-button lbh-button" disabled={isSubmitting}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CaseNoteForm
