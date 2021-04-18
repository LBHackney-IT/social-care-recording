import { GetServerSideProps } from "next"
import Head from "next/head"
import PersonWidget from "../../../components/PersonWidget"
import TaskList from "../../../components/TaskList"
import Link from "next/link"
import TaskListHeader from "../../../components/TaskListHeader"
import { getSession } from "../../../lib/auth"
import SingleStep from "../../../components/SingleStep"
import s from "../../../styles/Sidebar.module.scss"

const TaskListPage = ({ completedSteps, answers, person, form, params }) => (
  <>
    <Head>
      <title>{form?.name} | Social care | Hackney Council</title>
    </Head>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
    {form.steps ? (
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <TaskListHeader steps={form?.steps} completedSteps={completedSteps} />
          <TaskList form={form} completedSteps={completedSteps} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <PersonWidget person={person} />
          </div>
        </div>
      </div>
    ) : (
      <SingleStep
        stepAnswers={answers.id}
        fields={form.fields}
        person={person}
        params={params}
      />
    )}
  </>
)

TaskListPage.Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/`}>
      <a className="govuk-back-link lbh-back-link">Back to home</a>
    </Link>
  </div>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  if (!getSession({ req })) {
    return {
      props: {},
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res1.json()

  // redirect if submission doesn't exist
  if (!data.id)
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    }

  return {
    props: {
      ...data,
      params,
    },
  }
}

TaskListPage.goBackPath = "/"

export default TaskListPage
