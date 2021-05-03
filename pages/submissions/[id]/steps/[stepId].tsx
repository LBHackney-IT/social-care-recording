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

const Step = ({
  params,
  stepAnswers,
  person,
  step,
  form,
}): React.ReactElement => {
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
    } catch (e) {
      setStatus(e.toString())
    }
  }

  const handleFinish = async (values, { setStatus }): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            person,
          }),
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      router.push("/")
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
                onFinish={handleFinish}
                singleStep={form.steps.length === 1}
              />
            )}
          </div>
          <div className="govuk-grid-column-one-third">
            <div className={s.sticky}>
              <AutosaveIndicator />
              <p className="lbh-body">This submission is about:</p>
              <PersonWidget person={person} />
            </div>
          </div>
        </div>
      </AutosaveProvider>
    </>
  )
}

const Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/submissions/${params.id}`}>
      <a className="govuk-back-link lbh-back-link">Go back</a>
    </Link>
  </div>
)

Step.Postheader = Postheader

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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
