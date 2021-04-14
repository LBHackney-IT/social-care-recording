import { Field as RawField } from "formik"

interface FieldProps {
  touched
  errors
  name: string
  label: string
  type?: string
  hint?: string
  className?: string
  options: {
    id: string
    name: string
  }[]
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  options,
  ...props
}: FieldProps): React.ReactElement => (
  <div
    className={`govuk-form-group lbh-form-group ${
      touched[name] && errors[name] && "govuk-form-group--error"
    }`}
  >
    <label htmlFor={name} className="govuk-label lbh-label">
      {label}
    </label>

    {hint && (
      <span id={`${name}-hint`} className="govuk-hint lbh-hint">
        {hint}
      </span>
    )}

    {touched[name] && errors[name] && (
      <p className="govuk-error-message lbh-error-message" role="alert">
        <span className="govuk-visually-hidden">Error:</span> {errors[name]}
      </p>
    )}

    <RawField
      as="select"
      name={name}
      id={name}
      aria-describedby={hint ? `${name}-hint` : false}
      className={`govuk-select lbh-select ${className}`}
      {...props}
    >
      {options.map(option => (
        <option value={option.id} key={option.id}>
          {option.name}
        </option>
      ))}
    </RawField>
  </div>
)

export default Field
