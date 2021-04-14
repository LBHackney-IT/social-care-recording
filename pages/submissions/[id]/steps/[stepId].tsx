import { GetServerSideProps } from "next"
import Link from "next/link"
import PersonWidget from "../../../../components/PersonWidget"
import StepForm from "../../../../components/StepForm"

const handleSubmit = values => null

const Step = ({ params, name, fields, person, submission }) => (
  <>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{name}</h1>
      </div>
    </div>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Link href={`/submissions/${params.id}`}>Back to task list</Link>
        {fields && <StepForm fields={fields} onSubmit={handleSubmit} />}
      </div>
      <div className="govuk-grid-column-one-third">
        <PersonWidget person={person} />
      </div>
    </div>
  </>
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
