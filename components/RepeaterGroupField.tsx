import { FieldArray, useFormikContext } from "formik"
import { Field } from "../config/forms.types"
import s from "../styles/Repeater.module.scss"
import FlexibleField from "./FlexibleFields"

interface Props {
  name: string
  itemName: string
  subfields: Field[]
  label
  hint
}

const RepeaterGroupField = ({
  name,
  itemName,
  subfields,
  hint,
  label,
}: Props): React.ReactElement => {
  const { initialValues, values, touched, errors } = useFormikContext()

  const repeaterValues = [].concat(values[name])

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        touched[name] &&
        errors[name] &&
        typeof errors[name] === "string" &&
        "govuk-form-group--error"
      }`}
    >
      <p>Initial values: {JSON.stringify(initialValues)}</p>

      <p>Errors: {JSON.stringify(errors)}</p>

      <p>Touched: {JSON.stringify(touched)}</p>

      <fieldset
        className="govuk-fieldset"
        aria-describedby={hint && `${name}-hint`}
      >
        <legend className="lbh-heading-h2">{label}</legend>

        {hint && (
          <span id={`${name}-hint`} className="govuk-hint lbh-hint">
            {hint}
          </span>
        )}

        {touched[name] && errors[name] && (
          <p className="govuk-error-message lbh-error-message" role="alert">
            <span className="govuk-visually-hidden">Error:</span>{" "}
            {Array.isArray(errors[name])
              ? JSON.stringify(errors[name][0])
              : errors[name]}
          </p>
        )}

        <FieldArray name={name}>
          {({ insert, remove, push }) => (
            <>
              {repeaterValues.map((item, i) => (
                <div key={i}>
                  <h3 className="lbh-heading-h3">
                    {itemName.replace(/^\w/, c => c.toUpperCase()) || "Item"}{" "}
                    {i + 1}
                  </h3>
                  {subfields.map(subfield => (
                    <FlexibleField
                      values={values}
                      field={{
                        ...subfield,
                        name: `${name}[${i}].${subfield.id}`,
                      }}
                      touched={{
                        [name]: [
                          {
                            [subfield.id]: true,
                          },
                        ],
                      }}
                      errors={errors}
                      key={subfield.id}
                    />
                  ))}

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
                {repeaterValues.length > 0
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

export default RepeaterGroupField
