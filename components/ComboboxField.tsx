import React from "react"
import { useFormikContext, getIn, ErrorMessage } from "formik"
import Downshift from "downshift"
import s from "../styles/ComboboxField.module.scss"

interface FieldProps {
  touched
  errors
  name: string
  label: string
  type?: string
  hint?: string
  className?: string
  required?: boolean
  choices: {
    value: string
    label: string
  }[]
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  choices,
}: FieldProps): React.ReactElement => {
  const { values, setFieldValue } = useFormikContext()

  const items = choices.map(choice => choice.label)

  const initial =
    choices?.find(choice => choice.value === values[name])?.label || ""

  return (
    <Downshift
      id={`${name}-combobox`}
      initialSelectedItem={initial}
      onChange={selection =>
        setFieldValue(
          name,
          choices.find(choice => choice.label === selection).value
        )
      }
      itemToString={item => (item ? item : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        getRootProps,
      }) => (
        <div
          className={`govuk-form-group lbh-form-group ${
            getIn(touched, name) &&
            getIn(errors, name) &&
            "govuk-form-group--error"
          }`}
        >
          <label className="govuk-label lbh-label" {...getLabelProps()}>
            {label}
          </label>

          {hint && (
            <span id={`${name}-hint`} className="govuk-hint lbh-hint">
              {hint}
            </span>
          )}

          <ErrorMessage name={name}>
            {msg => (
              <p className="govuk-error-message lbh-error-message" role="alert">
                <span className="govuk-visually-hidden">Error:</span>
                {msg}
              </p>
            )}
          </ErrorMessage>

          <div
            {...getRootProps(undefined, { suppressRefError: true })}
            className={s.combobox}
          >
            <input
              {...getInputProps()}
              className={`govuk-input lbh-input ${s.input} ${className}`}
              aria-describedby={hint ? `${name}-hint` : undefined}
            />
            <button
              {...getToggleButtonProps()}
              aria-label="toggle menu"
              className={s.button}
            >
              <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
                <path
                  d="M2 1.5L8.5 7.5L15 1.5"
                  stroke="#0B0C0C"
                  strokeWidth="3"
                />
              </svg>
            </button>

            {isOpen && (
              <ul {...getMenuProps()} className={s.list}>
                {items
                  .filter(
                    item =>
                      !inputValue ||
                      item.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((item, i) => (
                    <li
                      {...getItemProps({
                        key: item,
                        index: i,
                        item,
                      })}
                      key={i}
                      className={s.option}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Downshift>
  )
}

export default Field
