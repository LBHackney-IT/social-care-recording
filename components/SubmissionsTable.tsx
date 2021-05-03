import { useState } from "react"
import { Submission } from "@prisma/client"
import s from "../styles/SubmissionsTable.module.scss"
import { Form } from "../config/forms.types"
import { useSession } from "../lib/auth"
import SubmissionRow from "./SubmissionRow"

export interface SubmissionWithForm extends Submission {
  form: Form
}

interface Props {
  results: SubmissionWithForm[]
}

const SubmissionsTable = ({ results }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState<string | boolean>(false)

  if (!(results?.length > 0)) return <p className="lbh-body">Nothing to show</p>

  return (
    <table className="govuk-table lbh-table govuk-!-margin-top-4">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Person
          </th>
          <th scope="col" className="govuk-table__header">
            Form
          </th>
          <th scope="col" className="govuk-table__header">
            Started
          </th>
          <th scope="col" className="govuk-table__header">
            By
          </th>
          <th scope="col" className="govuk-table__header">
            <span className="govuk-visually-hidden">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {results.map(result => (
          <SubmissionRow
            key={result.id}
            submission={result}
            expanded={expanded === result.id}
            setExpanded={setExpanded}
          />
        ))}
      </tbody>
    </table>
  )
}

export default SubmissionsTable
