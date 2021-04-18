import { useCallback } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import PersonWidget from "./PersonWidget"
import StepForm from "./StepForm"
import { useRouter } from "next/router"
import {
  AutosaveProvider,
  AutosaveIndicator,
} from "../contexts/autosaveContext"
import s from "../styles/Sidebar.module.scss"
import Banner from "./Banner"
import { getSession } from "../lib/auth"

/** Render a form with only single step (eg. case notes) */
const SingleStep = ({ params, stepAnswers, person, fields }) => {
  const router = useRouter()

  const handleSubmit = async (values, { setStatus }): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      // TODO: how can we redirect back to the task list if the user clicks the button and the section is complete, but not on autosave?
      // router.push(`/submissions/${params.id}`)
    } catch (e) {
      setStatus(e.toString())
    }
  }

  const prefillable = useCallback(
    fields.find(field => field.prefill),
    [fields]
  )

  return (
    <AutosaveProvider>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          {fields && (
            <StepForm
              person={person}
              initialValues={stepAnswers}
              fields={fields}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <PersonWidget person={person} />
            <AutosaveIndicator />
          </div>
        </div>
      </div>
    </AutosaveProvider>
  )
}

export default SingleStep
