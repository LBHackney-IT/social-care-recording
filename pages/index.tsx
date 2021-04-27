import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { Submission } from "@prisma/client"
import { Form } from "../config/forms.types"
import SubmissionsTable, {
  SubmissionWithForm,
} from "../components/SubmissionsTable"
import { getSession } from "../lib/auth"

interface Props {
  forms: Form[]
  unfinishedSubmissions: SubmissionWithForm[]
}

const Start = ({ forms, unfinishedSubmissions }: Props) => {
  const router = useRouter()

  const handleSubmit = async (values, { setStatus }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions`,
        {
          method: "POST",
          body: JSON.stringify(values),
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      router.push(`/submissions/${data.id}`)
    } catch (e) {
      setStatus(e.toString())
    }
  }

  return (
    <div>
      <h1 className="govuk-visually-hidden">Submissions</h1>

      <h2 className="lbh-heading-h3">Resume a submission</h2>
      <SubmissionsTable unfinishedSubmissions={unfinishedSubmissions} />

      <h2 className="lbh-heading-h3">Start a new submission</h2>
      {forms && <StartForm onSubmit={handleSubmit} forms={forms} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!getSession({ req })) {
    return {
      props: {},
      redirect: {
        destination: "/sign-in",
      },
    }
  }

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`, {
    headers: {
      cookie: req.headers.cookie,
    },
  })
  const data = await res2.json()
  return {
    props: {
      ...data,
    },
  }
}

export default Start
