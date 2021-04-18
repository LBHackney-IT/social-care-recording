import { useCallback } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import PersonWidget from "../../../../components/PersonWidget"
import StepForm from "../../../../components/StepForm"
import { useRouter } from "next/router"
import {
  AutosaveProvider,
  AutosaveIndicator,
} from "../../../../contexts/autosaveContext"
import s from "../../../../styles/Sidebar.module.scss"
import Banner from "../../../../components/Banner"
import { getSession } from "../../../../lib/auth"

const Step = ({ params, stepAnswers, person, step }) => {
  const router = useRouter()

  const handleSubmit = async (values, { setStatus }): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
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
    step.fields.find(field => field.prefill),
    [step.fields]
  )

  return (
    <>
      <Head>
        <title>{step.name} | Social care | Hackney Council</title>
      </Head>

      {!stepAnswers && prefillable && (
        <Banner title="Some answers on this page have been prefilled">
          You can change them if you need.
        </Banner>
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {step.name}
          </h1>
        </div>
      </div>

      <AutosaveProvider>
        <div className={`govuk-grid-row ${s.outer}`}>
          <div className="govuk-grid-column-two-thirds">
            {step.fields && (
              <StepForm
                person={person}
                initialValues={stepAnswers}
                fields={step.fields}
                onSubmit={handleSubmit}
              />
            )}
            <p className="lbh-body">
              <Link href={`/submissions/${params.id}`}>
                <a className="lbh-link lbh-link--no-visited-state">
                  Back to list
                </a>
              </Link>
            </p>
          </div>
          <div className="govuk-grid-column-one-third">
            <div className={s.sticky}>
              <PersonWidget person={person} />
              <AutosaveIndicator />
            </div>
          </div>
        </div>
      </AutosaveProvider>
    </>
  )
}

Step.Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/submissions/${params.id}`}>
      <a className="govuk-back-link lbh-back-link">Back to list</a>
    </Link>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  if (!getSession({ req })) {
    return {
      props: {},
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res1.json()

  // redirect if step doesn't exist
  if (!data.step) {
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    }
  }

  return {
    props: {
      params,
      ...data,
    },
  }
}

export default Step
