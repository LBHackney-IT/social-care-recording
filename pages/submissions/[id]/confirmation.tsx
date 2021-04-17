import Head from "next/head"
import Link from "next/link"

const ConfirmationPage = ({ completedSteps, person, form }) => (
  <>
    <Head>
      <title>Confirmation | Social care | Hackney Council</title>
    </Head>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">{form?.name}</h1>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation lbh-panel">
          <h1 className="govuk-panel__title">Submitted successfully</h1>
          <div className="govuk-panel__body">Content here</div>
        </div>

        <p className="lbh-body">
          This submission has been added to the person's records.
        </p>
        <p className="lbh-body">
          See{" "}
          <a className="lbh-link" href="#">
            their single view
          </a>{" "}
          to continue, or{" "}
          <Link href="/">
            <a className="lbh-link lbh-link--no-visited-state">
              see your other submissions
            </a>
          </Link>
          .
        </p>
      </div>
    </div>
  </>
)

export default ConfirmationPage
