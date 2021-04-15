import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import PersonWidget from "../../../../components/PersonWidget"
import StepForm from "../../../../components/StepForm"

const handleSubmit = values => null

const Step = ({ params, name, fields, person, submission }) => (
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
        {fields && <StepForm fields={fields} onSubmit={handleSubmit} />}
      </div>
      <div className="govuk-grid-column-one-third">
        {person && <PersonWidget person={person} />}
      </div>
    </div>
  </>
)

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
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res.json()

  return {
    props: {
      params,
      ...data,
    },
  }
}

export default Step
