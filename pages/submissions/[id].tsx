import { GetServerSideProps } from "next"

const TaskList = props => (
  <>
    {/* <h1>Title goes here</h1> */}
    {JSON.stringify(props)}
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
