import { useState } from "react"
import { useFormikContext } from "formik"
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
  required,
  choices,
  ...props
}: FieldProps): React.ReactElement => {
  const { values, setFieldValue } = useFormikContext()

  let items = choices.map(choice => choice.label)

  let initial =
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
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div
          className={`govuk-form-group lbh-form-group ${
            touched[name] && errors[name] && "govuk-form-group--error"
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

          {touched[name] && errors[name] && (
            <p className="govuk-error-message lbh-error-message" role="alert">
              <span className="govuk-visually-hidden">Error:</span>{" "}
              {errors[name]}
            </p>
          )}

          <div
            {...getRootProps({}, { suppressRefError: true })}
            className={s.combobox}
          >
            <input
              {...getInputProps()}
              className={`govuk-input lbh-input ${s.input}`}
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
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item,
                        index,
                        item,
                      })}
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
