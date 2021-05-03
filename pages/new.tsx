import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { Form } from "../config/forms.types"
import { getSession } from "../lib/auth"

interface Props {
  forms: Form[]
}

const StartPage = ({ forms }: Props): React.ReactElement => {
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
      <h1 className="govuk-heading-h1 govuk-!-margin-bottom-8">
        Record something new
      </h1>

      {forms && <StartForm onSubmit={handleSubmit} forms={forms} />}
    </div>
  )
}

const Postheader = ({ params }): React.ReactElement => (
  <div className="lbh-container">
    <Link href={`/`}>
      <a className="govuk-back-link lbh-back-link">Go back</a>
    </Link>
  </div>
)

StartPage.Postheader = Postheader

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

export default StartPage
