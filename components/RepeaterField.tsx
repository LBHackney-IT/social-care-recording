import { Field as RawField, FieldArray, useFormikContext } from "formik"
import s from "../styles/Repeater.module.scss"

interface FieldProps {
  touched
  errors
  name: string
  label: string
  type?: string
  hint?: string
  className?: string
  required?: boolean
  itemName?: string
}

const RepeaterField = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  required,
  itemName,
  ...props
}: FieldProps): React.ReactElement => {
  const { values } = useFormikContext()

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        touched[name] && errors[name] && "govuk-form-group--error"
      }`}
    >
      <fieldset
        className="govuk-fieldset"
        aria-describedby={hint && `${name}-hint`}
      >
        <legend className="govuk-label lbh-label">{label}</legend>

        {hint && (
          <span id={`${name}-hint`} className="govuk-hint lbh-hint">
            {hint}
          </span>
        )}

        {touched[name] && errors[name] && (
          <p className="govuk-error-message lbh-error-message" role="alert">
            <span className="govuk-visually-hidden">Error:</span>{" "}
            {Array.isArray(errors[name]) ? errors[name][0] : errors[name]}
          </p>
        )}

        <FieldArray name={name}>
          {({ insert, remove, push }) => (
            <>
              {values[name].map((item, i) => (
                <div className={s.row} key={i}>
                  <label
                    className="govuk-visually-hidden"
                    htmlFor={`${name}.${i}`}
                  >
                    {label}
                  </label>

                  <RawField
                    name={`${name}.${i}`}
                    id={`${name}.${i}`}
                    className="govuk-input lbh-input"
                  />

                  <button
                    type="button"
                    className="lbh-link"
                    onClick={() => remove(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => push("")}
                className={`govuk-button lbh-button lbh-button--add ${s.addAnother}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M6.94 0L5 0V12H6.94V0Z" />
                  <path d="M12 5H0V7H12V5Z" />
                </svg>
                {values[name].length > 0
                  ? `Add another ${itemName || "item"}`
                  : `Add an ${itemName || "item"}`}
              </button>
            </>
          )}
        </FieldArray>
      </fieldset>
    </div>
  )
}

export default RepeaterField
