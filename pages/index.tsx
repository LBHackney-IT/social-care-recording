import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { Submission } from "@prisma/client"
import { Form } from "../config/forms.types"
import { prettyDate } from "../lib/formatters"

interface Props {
  forms: Form[]
  unfinishedSubmissions: Submission[]
}

const Start = ({ forms, unfinishedSubmissions }: Props) => {
  const router = useRouter()

  const handleSubmit = async values => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions`,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    )
    const data = await res.json()
    router.push(`/submissions/${data.id}`)
  }

  return (
    <div className="govuk-grid-row">
      <h1 className="govuk-visually-hidden">Submissions</h1>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Start a new submission</h2>
        <StartForm onSubmit={handleSubmit} formOptions={forms} />
      </div>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Resume a submission</h2>

        <table className="govuk-table lbh-table">
          <thead className="govuk-table__head">
            <tr className="govuk-table__row">
              <th scope="col" className="govuk-table__header">
                Person
              </th>
              <th scope="col" className="govuk-table__header">
                Started
              </th>
            </tr>
          </thead>
          <tbody className="govuk-table__body">
            {unfinishedSubmissions.map(submission => (
              <tr className="govuk-table__row" key={submission.id}>
                <td className="govuk-table__cell">
                  <Link href={`/submissions/${submission.id}`}>
                    <a className="lbh-link">{submission.socialCareId}</a>
                  </Link>
                </td>
                <td className="govuk-table__cell">
                  {prettyDate(submission.createdAt)} by {submission.createdBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`, {
    headers: {
      cookie: req.headers.cookie,
    },
  })
  const data = await res.json()
  return {
    props: {
      ...data,
    },
  }
}

export default Start
