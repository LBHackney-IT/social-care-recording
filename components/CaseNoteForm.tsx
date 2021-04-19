import { useCallback } from "react"
import { Formik, Form, Field } from "formik"
import { caseNoteSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import RadioField from "./RadioField"
import RepeaterField from "./RepeaterField"
import Link from "next/link"

interface Props {
  onSubmit: (values, any) => void
}

const CaseNoteForm = ({ onSubmit }: Props): React.ReactElement => {
  return (
    <Formik
      initialValues={{
        type: "",
        subtype: "",
        whatHappened: "",
        actions: [],
      }}
      validationSchema={caseNoteSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, touched, errors }) => (
        <Form>
          <RadioField
            name="type"
            label="What kind of note is this?"
            touched={touched}
            errors={errors}
            choices={[
              {
                value: "visit",
                label: "Visit",
              },
              {
                value: "correspondance",
                label: "Correspondance",
              },
              {
                value: "something-else",
                label: "Something else",
              },
            ]}
          />

          {values.type === "visit" && (
            <RadioField
              name="subtype"
              label="What kind of visit?"
              touched={touched}
              errors={errors}
              choices={[
                {
                  value: "home-visit",
                  label: "Home",
                },
                {
                  value: "office-visit",
                  label: "Email, letter or text message",
                },
                {
                  value: "no-reply-home-visit",
                  label: "No reply to home visit",
                },
              ]}
            />
          )}

          {values.type === "correspondance" && (
            <RadioField
              name="subtype"
              label="What kind of correspondance?"
              touched={touched}
              errors={errors}
              choices={[
                {
                  value: "visit",
                  label: "Phone call",
                },
                {
                  value: "letter",
                  label: "Email, letter or text message",
                },
              ]}
            />
          )}

          <TextField
            name="whatHappened"
            label="What happened?"
            as="textarea"
            rows={4}
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
