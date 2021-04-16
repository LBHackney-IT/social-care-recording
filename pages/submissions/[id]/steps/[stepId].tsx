import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import PersonWidget from "../../../../components/PersonWidget"
import StepForm from "../../../../components/StepForm"
import { useRouter } from "next/router"

const Step = ({ params, name, fields, person, submission }) => {
  const router = useRouter()

  const handleSubmit = async values => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
      }
    )
    const data = await res.json()
    router.push(`/submissions/${params.id}`)
  }

  return (
    <>
      <Head>
        <title>{name} | Social care | Hackney Council</title>
      </Head>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{name}</h1>
        </div>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          {fields && (
            <StepForm
              initialValues={submission.answers}
              fields={fields}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        <div className="govuk-grid-column-one-third">
          {person && <PersonWidget person={person} />}
        </div>
      </div>
    </>
  )
}

Step.Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/submissions/${params.id}`}>
      <a className="govuk-back-link lbh-back-link">Back to sections</a>
    </Link>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res1.json()

  // redirect if submission doesn't exist
  if (!data.answers) {
    res.setHeader("location", "/404")
    res.statusCode = 404
    res.end()
  }

  return {
    props: {
      params,
      ...data,
    },
  }
}

export default Step
