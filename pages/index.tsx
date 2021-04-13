import { NextPage } from "next"
import StartForm from "../components/StartForm"

const handleSubmit = values => {
  console.log(values)
}

const Start = ({ forms }) => {
  return (
    <>
      <h1>Start a new submission</h1>
      <StartForm onSubmit={handleSubmit} formOptions={forms} />
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
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
