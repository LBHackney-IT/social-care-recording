import { GetServerSideProps } from "next"
import Head from "next/head"
import PersonWidget from "../../components/PersonWidget"
import GroupRecordingWidget from "../../components/GroupRecordingWidget"
import Link from "next/link"
import { getSession } from "../../lib/auth"
import CaseNoteForm from "../../components/CaseNoteForm"
import { useRouter } from "next/router"
import s from "../../styles/Sidebar.module.scss"

const NewCaseNotePage = ({ params, person }) => {
  const router = useRouter()

  // TODO: handle this for real
  const handleSubmit = () => {
    router.push("/PROTOTYPE")
  }

  return (
    <>
      <Head>
        <title>New case note | Social care | Hackney Council</title>
      </Head>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">New case note</h1>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <CaseNoteForm onSubmit={handleSubmit} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This note is about:</p>
            {/* <PersonWidget person={person} /> */}
            <GroupRecordingWidget initialPerson={person} />
          </div>
        </div>
      </div>
    </>
  )
}

NewCaseNotePage.Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href="/PROTOTYPE">
      <a className="govuk-back-link lbh-back-link">Back to person</a>
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
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/case-notes/${params.personId}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )

  const data = await res1.json()

  // redirect if submission doesn't exist
  if (!data?.person?.mosaicId)
    return {
      props: {},
      redirect: {
        destination: "/404",
      },
    }

  return {
    props: {
      params,
      ...data,
    },
  }
}

export default NewCaseNotePage
