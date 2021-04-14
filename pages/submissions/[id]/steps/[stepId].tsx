import { GetServerSideProps } from "next"
import PersonWidget from "../../../../components/PersonWidget"

const Step = props => (
  <>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">Step name here</h1>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">Questions here...</div>
      <div className="govuk-grid-column-one-third">
        {/* <PersonWidget person={person} /> */}
        {JSON.stringify(props)}
      </div>
    </div>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  // const res = await fetch(
  // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
  //   {
  //     headers: {
  //       cookie: req.headers.cookie,
  //     },
  //   }
  // )
  // const data = await res.json()

  return {
    props: {
      url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
      // ...data,
    },
  }
}

export default Step
