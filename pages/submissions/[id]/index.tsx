import { GetServerSideProps } from "next"
import PersonWidget from "../../../components/PersonWidget"
import TaskList from "../../../components/TaskList"

const TaskListPage = ({ submission, person, form }) => (
  <>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h2 className="lbh-heading-h4">Submission incomplete</h2>
        <p className="lbh-body  govuk-!-margin-top-2">
          You've completed 0 of {form.steps.length} sections. Your work will be
          saved automatically.
        </p>
        <TaskList form={form} />
      </div>
      <div className="govuk-grid-column-one-third">
        {person && <PersonWidget person={person} />}
      </div>
    </div>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )

  const data = await res.json()

  return {
    props: {
      ...data,
    },
  }
}

TaskListPage.goBackPath = "/"

export default TaskListPage