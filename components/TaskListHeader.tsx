import { Step } from "../config/forms.types"
import { useState } from "react"

interface Props {
  steps: Step[]
  completedSteps: string[]
  onFinish: () => void
}

const TaskListHeader = ({
  steps,
  completedSteps,
  onFinish,
}: Props): React.ReactElement => {
  const [submitting, setSubmitting] = useState(false)

  if (completedSteps?.length < steps.length)
    return (
      <>
        <h2 className="lbh-heading-h4">Submission incomplete</h2>
        <p className="lbh-body  govuk-!-margin-top-2">
          You&apos;ve completed {completedSteps?.length || "0"} of{" "}
          {steps.length} sections. Your work will be saved automatically.
        </p>
      </>
    )

  return (
    <>
      <h2 className="lbh-heading-h4">Submission complete</h2>
      <p className="lbh-body  govuk-!-margin-top-2">
        You can now submit for review.
      </p>

      <button
        onClick={() => {
          setSubmitting(true)
          onFinish()
        }}
        className="govuk-button lbh-button"
        disabled={submitting}
      >
        Finish and send
      </button>
    </>
  )
}

export default TaskListHeader
