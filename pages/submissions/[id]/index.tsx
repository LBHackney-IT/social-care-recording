import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import PersonWidget from "../../../components/PersonWidget"
import TaskList from "../../../components/TaskList"
import Link from "next/link"
import TaskListHeader from "../../../components/TaskListHeader"
import { getSession } from "../../../lib/auth"

const TaskListPage = ({ completedSteps, person, form, params }) => {
  const router = useRouter()

  const handleFinish = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/confirm`,
      {
        method: "POST",
      }
    )
    const data = await res.json()
    if (data) router.push(`/submissions/${params.id}/confirm`)
  }

  return (
    <>
      <Head>
        <title>{form?.name} | Social care | Hackney Council</title>
      </Head>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <TaskListHeader
            onFinish={handleFinish}
            steps={form?.steps}
            completedSteps={completedSteps}
          />
          <TaskList form={form} completedSteps={completedSteps} />
        </div>
        <div className="govuk-grid-column-one-third">
          {person && <PersonWidget person={person} />}
        </div>
      </div>
    </>
  )
}

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
  if (!data.id) {
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    }
  }

  return {
    props: {
      ...data,
      params,
    },
  }
}

export default TaskListPage
