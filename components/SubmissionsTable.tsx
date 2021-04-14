import Link from "next/link"
import { Submission } from "@prisma/client"
import { prettyDate } from "../lib/formatters"

interface Props {
  unfinishedSubmissions: Submission[]
}

const SubmissionsTable = ({ unfinishedSubmissions }: Props) => {
  return (
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
  )
}

export default SubmissionsTable
