import { GetServerSideProps } from "next"
import PersonWidget from "../../components/PersonWidget"

const TaskList = ({ submission, person, form }) => (
  <>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">Task list here...</div>
      <div className="govuk-grid-column-one-third">
        <PersonWidget person={person} />
      </div>
    </div>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res.json()

  return {
    props: {
      ...data,
    },
  }
}

export default TaskList
