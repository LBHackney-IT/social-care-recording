import { GetServerSideProps } from "next"
import PersonWidget from "../../../components/PersonWidget"

const TaskList = ({ submission, person, form }) => {
  // 1. group steps by theme
  const themes = form.steps.reduce(function (groups, item) {
    var name = item["theme"]
    var group = groups[name] || (groups[name] = [])
    group.push(item)

    return groups
  }, {})

  console.log(themes)

  return (
    <>
      <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ol>
            {Object.keys(themes).map(theme => (
              <li>{themes[theme].name}</li>
            ))}
          </ol>
          {JSON.stringify(themes)}
        </div>
        <div className="govuk-grid-column-one-third">
          {person && <PersonWidget person={person} />}
        </div>
      </div>
    </>
  )
}

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

TaskList.goBackPath = "/"

export default TaskList
