import { GetServerSideProps } from "next"
import StartForm from "../components/StartForm"
import { useRouter } from "next/router"
import Link from "next/link"
import { Submission } from "@prisma/client"
import { Form } from "../config/forms.types"
import SubmissionsTable from "../components/SubmissionsTable"
import { getSession } from "../lib/auth"

interface Props {
  forms: Form[]
  unfinishedSubmissions: Submission[]
}

const Start = ({ forms, unfinishedSubmissions }: Props) => {
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
    <div className="govuk-grid-row">
      <h1 className="govuk-visually-hidden">Submissions</h1>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Start a new submission</h2>
        {forms && <StartForm onSubmit={handleSubmit} forms={forms} />}
      </div>

      <div className="govuk-grid-column-one-half">
        <h2 className="lbh-heading-h3">Resume a submission</h2>
        <SubmissionsTable unfinishedSubmissions={unfinishedSubmissions} />
      </div>
      <br/>
      <div>
      <h1 class="lbh-heading-h1 govuk-!-margin-bottom-8">Namey McName</h1>
      <div className="govuk-grid-column-two-thirds">
      <section class="lbh-collapsible" data-module="lbh-collapsible">
      <button
        aria-expanded="true"
        data-behavior="lbh-collapsible-toggle"
        class="lbh-collapsible__button"
      >
        <h2 class="lbh-heading-h2 lbh-collapsible__heading">Contact details</h2>
        <svg width="17" height="10" viewBox="0 0 17 10">
          <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
        </svg>
      </button>
      <div class="lbh-collapsible__content" data-behavior="lbh-collapsible-content">
      <dl class="govuk-summary-list lbh-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">ID</dt>
          <dd class="govuk-summary-list__value">12345</dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Date of birth</dt>
          <dd class="govuk-summary-list__value">07 Sep 1993</dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Address</dt>
          <dd class="govuk-summary-list__value">12345</dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Phone number</dt>
          <dd class="govuk-summary-list__value">0777777777</dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Responsibility of</dt>
          <dd class="govuk-summary-list__value">Children's social care</dd>
        </div>
        </dl>
          </div>
        </section>
        <section class="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            class="lbh-collapsible__button"
          >
            <h2 class="lbh-heading-h2 lbh-collapsible__heading">Relationships (5)</h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
            </svg>
          </button>
          <div
            class="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
            hidden
          >
      </div>
      </section>
          <section class="lbh-collapsible" data-module="lbh-collapsible">
      <button
        aria-expanded="true"
        data-behavior="lbh-collapsible-toggle"
        class="lbh-collapsible__button"
      >
        <h2 class="lbh-heading-h2 lbh-collapsible__heading ">Case history (14)</h2>
        <svg width="17" height="10" viewBox="0 0 17 10">
          <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
        </svg>
      </button>
      <div class="lbh-collapsible__content" data-behavior="lbh-collapsible-content">
      <dl class="govuk-summary-list lbh-summary-list">
      <button class="govuk-button lbh-button__left" data-module="govuk-button">
        New note
      </button>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">ID</dt>
          <dd class="govuk-summary-list__value">12345</dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">Date of birth</dt>
          <dd class="govuk-summary-list__value">07 Sep 1993</dd>
        </div>
        </dl>
          </div>
        </section>
      <nav class="lbh-pagination">
          <div class="lbh-pagination__summary">Showing 101—150 of 246 results</div>
          <ul class="lbh-pagination">
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Previous page">
                <span aria-hidden="true" role="presentation">&laquo;</span>
                Previous
              </a>
            </li>
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Page 1">1</a>
            </li>
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Page 2">2</a>
            </li>
            <li class="lbh-pagination__item">
              <a
                class="lbh-pagination__link lbh-pagination__link--current"
                href="#"
                aria-current="true"
                aria-label="Page 3, current page"
              >
                3
              </a>
            </li>
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Page 4">4</a>
            </li>
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Page 5">5</a>
            </li>
            <li class="lbh-pagination__item">
              <a class="lbh-pagination__link" href="#" aria-label="Next page">
                Next
                <span aria-hidden="true" role="presentation">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="govuk-grid-column-one-third">
            <section class="lbh-collapsible" data-module="lbh-collapsible">
      <button
        aria-expanded="true"
        data-behavior="lbh-collapsible-toggle"
        class="lbh-collapsible__button"
      >
        <h2 class="lbh-heading-h2 lbh-collapsible__heading">Allocations</h2>
        <svg width="17" height="10" viewBox="0 0 17 10">
          <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
        </svg>
      </button>
      <div class="lbh-collapsible__content" data-behavior="lbh-collapsible-content">
      <dl class="govuk-summary-list lbh-summary-list">
      <dd class="govuk-summary-list__value"> No one is allocated right now </dd> </dl>
      <button
        class="govuk-button govuk-secondary lbh-button lbh-button--secondary"
        data-module="govuk-button"
      >
        Allocation
      </button>
      </div>
      </section>
        <section class="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            class="lbh-collapsible__button"
          >
            <h2 class="lbh-heading-h2 lbh-collapsible__heading">Status</h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
            </svg>
          </button>
          <div
            class="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
            hidden
          >
      </div>
      </section>
      </div>
      
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

export default Start
