import { useState } from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import s from "../styles/Index.module.scss"

import SubmissionsTable, {
  SubmissionWithForm,
} from "../components/SubmissionsTable"
import { getSession } from "../lib/auth"

interface Props {
  user
  unfinishedSubmissions: SubmissionWithForm[]
}

const FilterRadio = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}): React.ReactElement => (
  <div className="govuk-radios__item">
    <input
      name="show"
      className="govuk-radios__input"
      id={`show-${label}`}
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <label
      className="govuk-label govuk-radios__label"
      htmlFor={`show-${label}`}
    >
      {label}
    </label>
  </div>
)

const IndexPage = ({
  user,
  unfinishedSubmissions,
}: Props): React.ReactElement => {
  const [justMine, setJustMine] = useState<boolean>(false)

  const results = justMine
    ? unfinishedSubmissions.filter(result => result.createdBy === user.email)
    : unfinishedSubmissions

  return (
    <div>
      <h1 className="govuk-visually-hidden">Submissions</h1>

      <div className={s.box}>
        <h2 className="lbh-heading-h3">Record something new</h2>
        <p className="lbh-body govuk-!-margin-top-3">
          Add something new against a person&apos;s case.
        </p>
        <Link href="/new">
          <a className="govuk-button lbh-button govuk-!-margin-top-5">Start</a>
        </Link>
      </div>

      <h2 className="lbh-heading-h3 govuk-!-margin-top-8">
        Unfinished submissions
      </h2>

      <fieldset className="govuk-radios govuk-radios--inline lbh-radios">
        <legend className="govuk-fieldset__legend govuk-visually-hidden">
          Show
        </legend>
        <FilterRadio
          label="All"
          checked={!justMine}
          onChange={() => setJustMine(false)}
        />
        <FilterRadio
          label="Just mine"
          checked={justMine}
          onChange={() => setJustMine(true)}
        />
      </fieldset>

      <SubmissionsTable results={results} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = getSession({ req })
  if (!session) {
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
      ...session,
    },
  }
}

export default IndexPage
