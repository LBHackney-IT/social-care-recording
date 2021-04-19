import { useCallback } from "react"
import { Formik, Form, Field } from "formik"
import { caseNoteSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import RadioField from "./RadioField"
import RepeaterField from "./RepeaterField"
import FileUploadField from "./FileUploadField"
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
        files: null,
      }}
      validationSchema={caseNoteSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, touched, errors, setFieldValue }) => (
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
            <div className="govuk-inset-text lbh-inset-text">
              You don't need to copy and paste emails. Forward your threads to{" "}
              <strong>exampleemail@hackney.gov.uk</strong> to automatically add
              them to a person's record.
            </div>
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
            hint="eg. 'Dave to contact GP'"
            touched={touched}
            errors={errors}
            itemName="action"
          />

          <FileUploadField
            label="Add files or photos"
            name="files"
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
            multiple
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
