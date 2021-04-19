import { GetServerSideProps } from "next"
import Head from "next/head"
import PersonWidget from "../../components/PersonWidget"
import Link from "next/link"
import { getSession } from "../../lib/auth"
import CaseNoteForm from "../../components/CaseNoteForm"

const NewCaseNotePage = ({ params, person }) => {
  return (
    <>
      <Head>
        <title>New case note | Social care | Hackney Council</title>
      </Head>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">New case note</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <CaseNoteForm onSubmit={null} />
        </div>
        <div className="govuk-grid-column-one-third">
          <PersonWidget person={person} />
        </div>
      </div>
    </>
  )
}

NewCaseNotePage.Postheader = ({ params }): React.ReactElement => (
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
