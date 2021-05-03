import { useState } from "react"
import Link from "next/link"
import { Submission } from "@prisma/client"
import { prettyDate, prettyDateAndTime } from "../lib/formatters"
import s from "../styles/SubmissionsTable.module.scss"
import { Form } from "../config/forms.types"
import DiscardDialog from "../components/DiscardDialog"

export interface SubmissionWithForm extends Submission {
  form: Form
}

interface RowProps {
  submission: SubmissionWithForm
  expanded: boolean
  setExpanded: (newValue: string | boolean) => void
}

const SubmissionRow = ({
  submission,
  expanded,
  setExpanded,
}: RowProps): React.ReactElement => {
  const editors = submission.editedBy.filter(el => el !== submission.createdBy)

  const completed =
    submission.completedSteps.length === submission.form.steps.length

  return (
    <>
      <tr className={`govuk-table__row ${s.row}`}>
        <td className="govuk-table__cell">{submission.socialCareId}</td>
        <td className="govuk-table__cell">
          {/* <meter
          className={s.meter}
          value={submission.completedSteps.length}
          max={submission.form.steps.length}
        /> */}
          <Link
            href={
              submission.form.steps.length > 1
                ? `/submissions/${submission.id}`
                : `/submissions/${submission.id}/steps/${submission?.form?.steps[0]?.id}`
            }
          >
            <a className="lbh-link lbh-link--no-visited-state">
              {submission.form.name}
            </a>
          </Link>
        </td>
        <td className="govuk-table__cell">
          {prettyDate(submission.createdAt.toString())}
        </td>
        <td className="govuk-table__cell">{submission.createdBy}</td>
        <td className="govuk-table__cell">
          <button
            className={`lbh-link ${s.expanderButton}`}
            aria-expanded={expanded}
            onClick={() =>
              expanded ? setExpanded(false) : setExpanded(submission.id)
            }
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect y="5.41675" width="13" height="2.16667" fill="#0B0C0C" />
              {!expanded && (
                <rect
                  x="5.41663"
                  y="13"
                  width="13"
                  height="2.16667"
                  transform="rotate(-90 5.41663 13)"
                  fill="#0B0C0C"
                />
              )}
            </svg>

            <span className="govuk-visually-hidden">
              {expanded ? "Hide details" : "Expand details"}
            </span>
          </button>
        </td>
      </tr>

      {expanded && (
        <tr className="govuk-table__row">
          <td colSpan={5} className={`govuk-table__cell ${s.cell}`}>
            <dl className={s.dl}>
              <div>
                <dd>{prettyDateAndTime(submission.createdAt.toString())}</dd>
                <dt className="lbh-body-s">Started</dt>
              </div>

              <div>
                <dd>{prettyDateAndTime(submission.updatedAt.toString())}</dd>
                <dt className="lbh-body-s">Last edited</dt>
              </div>

              {submission.form.steps.length > 1 && (
                <div>
                  <dd>
                    {completed ? (
                      "Ready to send"
                    ) : (
                      <>
                        {submission.completedSteps?.length || "0"} of{" "}
                        {submission.form.steps.length} sections (
                        {Math.round(
                          (submission.completedSteps?.length /
                            submission.form.steps.length) *
                            100
                        )}
                        %)
                      </>
                    )}
                  </dd>
                  <dt className="lbh-body-s">Progress</dt>
                </div>
              )}

              {editors.length > 0 && (
                <div>
                  <dd>{editors}</dd>
                  <dt className="lbh-body-s">Editors</dt>
                </div>
              )}
            </dl>

            <DiscardDialog submissionId={submission.id} />
          </td>
        </tr>
      )}
    </>
  )
}

export default SubmissionRow
