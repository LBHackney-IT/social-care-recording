import s from "../styles/TaskList.module.scss";
import { Step } from "../config/forms.types";

interface Props {
  steps: Step[];
  completedSteps: String[];
}

const TaskListHeader = ({
  steps,
  completedSteps,
}: Props): React.ReactElement => {
  if (completedSteps?.length < steps.length)
    return (
      <>
        <h2 className="lbh-heading-h4">Submission incomplete</h2>
        <p className="lbh-body  govuk-!-margin-top-2">
          You've completed {completedSteps?.length || "0"} of {steps.length}{" "}
          sections. Your work will be saved automatically.
        </p>
      </>
    );

  return (
    <>
      <h2 className="lbh-heading-h4">Submission complete</h2>
      <p className="lbh-body  govuk-!-margin-top-2">
        You can now submit for review.
      </p>
    </>
  );
};

export default TaskListHeader;