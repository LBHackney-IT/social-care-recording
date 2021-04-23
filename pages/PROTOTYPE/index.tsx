import MultiButton from "../../components/MultiButton"

const PersonViewPrototype = () => (
  <>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-7">Test User</h1>

    <MultiButton
      label="Contact method"
      name="lbh-default-contact-method"
      secondary
      choices={[
        {
          href: "https://hackney-sms-demo.herokuapp.com",
          title: "Send a message",
          target: "blank",
          description: "Send them a text message using our SMS tool.",
        },
        {
          href: "https://mail.google.com/mail/u/0/#compose",
          title: "Send an email",
          target: "blank",
          description: "Using your Gmail account.",
        },
        {
          href: "https://www.notifications.service.gov.uk/",
          title: "Send a letter",
          target: "blank",
          description: "Using the Notify letters service.",
        },
      ]}
    />

    <div className="govuk-grid-row govuk-!-margin-top-7">
      <div className="govuk-grid-column-two-thirds">
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Personal details
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
          >
            <dl className="govuk-summary-list lbh-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">ID</dt>
                <dd className="govuk-summary-list__value">12345</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Date of birth</dt>
                <dd className="govuk-summary-list__value">07 Sep 1993</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Address</dt>
                <dd className="govuk-summary-list__value">
                  123 Town St
                  <br /> Citythorpe
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Phone number</dt>
                <dd className="govuk-summary-list__value">077 777 7777</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Responsibility of</dt>
                <dd className="govuk-summary-list__value">
                  Children's social care
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          className="lbh-collapsible govuk-!-margin-top-8"
          data-module="lbh-collapsible"
        >
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button "
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Case history (14)
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content govuk-!-margin-top-6"
            data-behavior="lbh-collapsible-content"
          >
            <MultiButton
              label="What do you want to record?"
              name="lbh-default-record"
              choices={[
                {
                  href: "/case-notes/2",
                  title: "Add case note",
                  description: "Record visits and correspondance.",
                },
                {
                  href: "#",
                  title: "Start assessment",
                  description:
                    "Begin a statutory social care needs assessment.",
                },
                {
                  href: "#",
                  title: "Add something else",
                  description:
                    "Record any other important details about this case.",
                },
              ]}
            />

            <table className="govuk-table lbh-table">
              <thead className="govuk-table__head">
                <tr>
                  <th scope="col" className="govuk-table__header">
                    {" "}
                    Created on
                  </th>
                  <th scope="col" className="govuk-table__header">
                    {" "}
                    Type and title
                  </th>
                  <th scope="col" className="govuk-table__header">
                    {" "}
                    Created by
                  </th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell">30 Oct 2020 </td>
                  <td className="govuk-table__cell">
                    <a className="govuk-link" href="#">
                      Correspondance
                    </a>
                    <p className="lbh-body-xs govuk-!-margin-top-2">
                      A short description of the note...
                    </p>
                  </td>
                  <td className="govuk-table__cell">Firstname Surname</td>
                </tr>
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell">17 Sept 2020 </td>
                  <td className="govuk-table__cell">
                    <a className="govuk-link" href="#">
                      Case note
                    </a>
                    <p className="lbh-body-xs govuk-!-margin-top-2">
                      A short description of the note...
                    </p>
                  </td>
                  <td className="govuk-table__cell">Firstname Surname</td>
                </tr>
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell">23 Jun 2020 </td>
                  <td className="govuk-table__cell">
                    <a className="govuk-link" href="#">
                      Review of care and support
                    </a>
                    <p className="lbh-body-xs govuk-!-margin-top-2">
                      A short description of the note...
                    </p>
                  </td>
                  <td className="govuk-table__cell">Firstname Surname</td>
                </tr>
              </tbody>
            </table>
            <nav className="lbh-pagination">
              <ul className="lbh-pagination ">
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link lbh-pagination__link--current"
                    href="#"
                    aria-current="true"
                    aria-label="Page 1, current page"
                  >
                    1
                  </a>
                </li>
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link"
                    href="#"
                    aria-label="Page 2"
                  >
                    2
                  </a>
                </li>
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link"
                    href="#"
                    aria-label="Page 3"
                  >
                    3
                  </a>
                </li>
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link"
                    href="#"
                    aria-label="Page 4"
                  >
                    4
                  </a>
                </li>
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link"
                    href="#"
                    aria-label="Page 5"
                  >
                    5
                  </a>
                </li>
                <li className="lbh-pagination__item">
                  <a
                    className="lbh-pagination__link"
                    href="#"
                    aria-label="Next page"
                  >
                    Next{" "}
                    <span aria-hidden="true" role="presentation">
                      &raquo;
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <section
          className="lbh-collapsible govuk-!-margin-top-8"
          data-module="lbh-collapsible"
        >
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Relationships (5)
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
            hidden
          ></div>
        </section>
      </div>
      <div className="govuk-grid-column-one-third">
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading ">
              Allocations
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
          >
            <p className="lbh-body">No one is allocated right now</p>

            <button
              className="govuk-button govuk-secondary lbh-button lbh-button--secondary"
              data-module="govuk-button"
            >
              Allocate
            </button>
          </div>
        </section>
        <section
          className="lbh-collapsible govuk-!-margin-top-8"
          data-module="lbh-collapsible"
        >
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">Status</h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
            hidden
          ></div>
        </section>
      </div>
    </div>
  </>
)

export default PersonViewPrototype
