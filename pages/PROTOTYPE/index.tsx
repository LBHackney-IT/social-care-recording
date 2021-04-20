const PersonViewPrototype = () => (
  <div>
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">Namey McName</h1>

    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Contact details
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
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
                <dd className="govuk-summary-list__value">12345</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Phone number</dt>
                <dd className="govuk-summary-list__value">0777777777</dd>
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
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Relationships (5)
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
            hidden
          ></div>
        </section>
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading ">
              Case history (14)
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
          >
            <dl className="govuk-summary-list lbh-summary-list">
              <button
                className="govuk-button lbh-button__left"
                data-module="govuk-button"
              >
                New note
              </button>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">ID</dt>
                <dd className="govuk-summary-list__value">12345</dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Date of birth</dt>
                <dd className="govuk-summary-list__value">07 Sep 1993</dd>
              </div>
            </dl>
          </div>
        </section>
        <nav className="lbh-pagination">
          <div className="lbh-pagination__summary">
            Showing 101—150 of 246 results
          </div>
          <ul className="lbh-pagination">
            <li className="lbh-pagination__item">
              <a
                className="lbh-pagination__link"
                href="#"
                aria-label="Previous page"
              >
                <span aria-hidden="true" role="presentation">
                  &laquo;
                </span>
                Previous
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a className="lbh-pagination__link" href="#" aria-label="Page 1">
                1
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a className="lbh-pagination__link" href="#" aria-label="Page 2">
                2
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a
                className="lbh-pagination__link lbh-pagination__link--current"
                href="#"
                aria-current="true"
                aria-label="Page 3, current page"
              >
                3
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a className="lbh-pagination__link" href="#" aria-label="Page 4">
                4
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a className="lbh-pagination__link" href="#" aria-label="Page 5">
                5
              </a>
            </li>
            <li className="lbh-pagination__item">
              <a
                className="lbh-pagination__link"
                href="#"
                aria-label="Next page"
              >
                Next
                <span aria-hidden="true" role="presentation">
                  &raquo;
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="govuk-grid-column-one-third">
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="true"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">
              Allocations
            </h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
            </svg>
          </button>
          <div
            className="lbh-collapsible__content"
            data-behavior="lbh-collapsible-content"
          >
            <dl className="govuk-summary-list lbh-summary-list">
              <dd className="govuk-summary-list__value">
                {" "}
                No one is allocated right now{" "}
              </dd>{" "}
            </dl>
            <button
              className="govuk-button govuk-secondary lbh-button lbh-button--secondary"
              data-module="govuk-button"
            >
              Allocation
            </button>
          </div>
        </section>
        <section className="lbh-collapsible" data-module="lbh-collapsible">
          <button
            aria-expanded="false"
            data-behavior="lbh-collapsible-toggle"
            className="lbh-collapsible__button"
          >
            <h2 className="lbh-heading-h2 lbh-collapsible__heading">Status</h2>
            <svg width="17" height="10" viewBox="0 0 17 10">
              <path d="M2 1.5L8.5 7.5L15 1.5" stroke-width="3" />
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
  </div>
)

export default PersonViewPrototype
