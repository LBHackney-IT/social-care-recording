import { useState } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import PersonWidget from "../../../components/PersonWidget"
import TaskList from "../../../components/TaskList"
import Link from "next/link"
import TaskListHeader from "../../../components/TaskListHeader"
import { getSession } from "../../../lib/auth"
import s from "../../../styles/Sidebar.module.scss"
import Banner from "../../../components/Banner"

const TaskListPage = ({
  params,
  completedSteps,
  person,
  form,
}): React.ReactElement => {
  const router = useRouter()
  const [status, setStatus] = useState(false)

  const handleFinish = async (): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            person,
          }),
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      router.push("/")
    } catch (e) {
      setStatus(e.toString())
    }
  }

  return (
    <>
      <Head>
        <title>{form?.name} | Social care | Hackney Council</title>
      </Head>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          {status && (
            <Banner
              title="There was a problem finishing the submission"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}
          <TaskListHeader
            steps={form?.steps}
            completedSteps={completedSteps}
            onFinish={handleFinish}
          />
          <TaskList form={form} completedSteps={completedSteps} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={person} />
          </div>
        </div>
      </div>
    </>
  )
}

const Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/`}>
      <a className="govuk-back-link lbh-back-link">Go back</a>
    </Link>
  </div>
)

TaskListPage.Postheader = Postheader

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
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
  // if (!data.id)
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: "/404",
  //     },
  //   }

  // go straight to the first step if it exists
  if (data.form.steps.length === 1)
    return {
      props: {},
      redirect: {
        destination: `/submissions/${data.id}/steps/${data.form.steps[0].id}`,
      },
    }

  return {
    props: {
      params,
      ...data,
    },
  }
}

export default TaskListPage
