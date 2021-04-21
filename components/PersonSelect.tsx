import React from "react"
import s from "../styles/PersonSelect.module.scss"

interface ChoiceProps {
  value: string
  name: string
  label: string
  dateOfBirth?: string
  address?: string
}

const Choice = ({
  value,
  name,
  label,
  dateOfBirth,
  address,
}: ChoiceProps): React.ReactElement => (
  <div className={`govuk-radios__item ${s.personResult}`}>
    <input
      className="govuk-radios__input"
      id={`${name}-${value}`}
      name={name}
      type="radio"
      value={value}
      aria-describedby={`${name}-${value}-hint`}
    />

    <label
      className={`govuk-radios__label lbh-body-s ${s.name}`}
      htmlFor={`${name}-${value}`}
    >
      {label}
    </label>

    <p id={`${name}=${value}-hint`} className={`lbh-body-xs ${s.meta}`}>
      {dateOfBirth && <span>{dateOfBirth}</span>}
      {address && <span>{address}</span>}
    </p>
  </div>
)

interface Props {
  label: string
  name: string
  choices: {
    value: string
    label: string
    dateOfBirth?: string
    address?: string
  }[]
}

const PersonSelect = ({ label, name, choices }: Props): React.ReactElement => (
  <div className="govuk-form-group lbh-form-group">
    <fieldset className="govuk-fieldset" aria-describedby="example-hint">
      <legend className="govuk-label lbh-label">{label}</legend>
      <div
        className={`govuk-radios govuk-radios--small lbh-radios ${s.personList}`}
      >
        {choices.map(choice => (
          <Choice name={name} key={choice.value} {...choice} />
        ))}
      </div>
    </fieldset>
  </div>
)

export default PersonSelect
