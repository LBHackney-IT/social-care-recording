import { useState } from "react"
import { Prisma } from "@prisma/client"
import { Form } from "../config/forms.types"
import SubmissionRow from "./SubmissionRow"

const submissionWithRevision = Prisma.validator<Prisma.SubmissionArgs>()({
  include: { revisions: true },
})

type SubmissionWithRevision = Prisma.SubmissionGetPayload<
  typeof submissionWithRevision
>

export interface SubmissionWithForm extends SubmissionWithRevision {
  form: Form
}

interface Props {
  results: SubmissionWithForm[]
}

const SubmissionsTable = ({ results }: Props): React.ReactElement => {
  const [expanded, setExpanded] = useState<string | boolean>(false)

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
