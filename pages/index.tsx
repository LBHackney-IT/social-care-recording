import { NextPage } from "next"
import StartForm from "../components/StartForm"

const Start = ({ forms }) => {
  const formOptions = forms.map(form => ({
    id: form.id,
    name: form.name,
  }))

  return (
    <>
      <h1>Start a thing</h1>
      <StartForm handleSubmit={() => {}} formOptions={formOptions} />
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
