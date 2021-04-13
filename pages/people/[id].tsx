import { GetServerSideProps } from "next"

const TaskList = props => (
  <>
    {JSON.stringify(props)}
    <h1>Task list page?</h1>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/people/1`,
    {
      headers: {
        cookie: req.headers.cookie,
      },
    }
  )
  const data = await res.json()

  return {
    props: {
      person: data,
    },
  }
}

export default TaskList
