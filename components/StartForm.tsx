import { useCallback } from "react"
import { Formik, Form, Field } from "formik"
import { startSchema } from "../lib/validators"
import { Form as FormType } from "../config/forms.types"
import TextField from "./TextField"
import SelectField from "./SelectField"
import CheckboxField from "./CheckboxField"
import { formsToChoices } from "../lib/helpers"

const testCsv = `form;question;
medication;Are you taking medication?
illness;Are you unwell?`

function formatCSV() {
  const parseCsv = csv => {
  let lines = csv.split("\n");
  const header = lines.shift().split(";")
  return lines.map(line => {
    const bits = line.split(";")
    let obj = {};
    header.forEach((h, i) => obj[h] = bits[i]); // or use reduce here
    return obj;
  })
};
  const parsedCsv = parseCsv(testCsv)
  const output = parsedCsv.map(title => {
  return {
    form: title.form,
    question: title.question,
  }
})
console.log('output JSON:', output)
}

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
          <br/>
          <button className="govuk-button lbh-button" disabled={isSubmitting} onClick={formatCSV}>
            convert csv to JSON 
          </button>
          
        </Form>
      )}
    </Formik>
  )
}

export default StartForm
