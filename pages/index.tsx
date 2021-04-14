import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { Submission } from "@prisma/client"
import { Form } from "../config/forms.types"
import SubmissionsTable from "../components/SubmissionsTable"

interface Props {
  forms: Form[]
  unfinishedSubmissions: Submission[]
}

const Start = ({ forms, unfinishedSubmissions }: Props) => {
  const router = useRouter()

  const handleSubmit = async values => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions`,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    )
    const data = await res.json()
    router.push(`/submissions/${data.id}`)
  }

  return (
    <div className="govuk-grid-row">
      <h1 className="govuk-visually-hidden">Submissions</h1>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Start a new submission</h2>
        <StartForm onSubmit={handleSubmit} formOptions={forms} />
      </div>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Resume a submission</h2>
        <SubmissionsTable unfinishedSubmissions={unfinishedSubmissions} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`, {
    headers: {
      cookie: req.headers.cookie,
    },
  })
  const data = await res.json()
  return {
    props: {
      ...data,
    },
  }
}

export default Start
