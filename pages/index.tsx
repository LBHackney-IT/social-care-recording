import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"

const Start = ({ forms }) => {
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
      <div className="govuk-grid-column-two-thirds">
        <h1 className="lbh-heading-h1">New submission</h1>
        {/* <p className="lbh-body">Explanatory text here</p> */}
        <StartForm onSubmit={handleSubmit} formOptions={forms} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/forms`, {
    headers: {
      cookie: req.headers.cookie,
    },
  })
  const data = await res.json()

  return {
    props: {
      forms: data,
    },
  }
}

export default Start
