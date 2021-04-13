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
    <>
      <h1>Start a new submission</h1>
      <StartForm onSubmit={handleSubmit} formOptions={forms} />
    </>
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
