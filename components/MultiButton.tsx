import { useState, useRef, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import useClickOutside from "../hooks/useClickOutside"
import s from "../styles/MultiButton.module.scss"

interface ChoiceProps {
  name: string
  value: string
  currentValue: string
  onChange: (string) => void
  label: string
  hint: string
}

const Choice = ({
  name,
  value,
  currentValue,
  onChange,
  label,
  hint,
}: ChoiceProps) => (
  <div className={s.option}>
    <input
      type="radio"
      name={name}
      value={value}
      id={`${name}-${value}`}
      aria-describedby={`${name}-${value}-hint`}
      checked={currentValue === value}
      onChange={onChange}
    />

    <label htmlFor={`${name}-${value}`} className={`lbh-body-s ${s.label}`}>
      {currentValue === value && (
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path d="M1 5.5L5.33333 10L14 1" stroke="#00664F" strokeWidth="2" />
        </svg>
      )}

      {label}
    </label>
    <p id={`${name}-${value}-hint`} className={`lbh-body-xs ${s.hint}`}>
      {hint}
    </p>
  </div>
)

interface Props {
  label: string
  /** Name is also the unique key to store/retrieve the default value from localstorage */
  name: string
  secondary?: boolean
  choices: {
    href: string
    title: string
    description: string
    target?: string
  }[]
}

const MultiButton = ({
  label,
  name,
  secondary,
  choices,
}: Props): React.ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentValue, setCurrentValue] = useLocalStorage(name, "0")

  const selection = choices[currentValue]

  const detailsRef = useRef(null)
  const fieldsetRef = useRef(null)

  const mouseHandler = e => {
    if (fieldsetRef?.current?.contains(e.target)) setMenuOpen(false)
  }

  const keyboardHandler = e => {
    if (fieldsetRef?.current?.contains(e.target) && e.key === "Enter")
      setMenuOpen(false)
  }

  useEffect(() => {
    window.addEventListener("mouseup", mouseHandler)
    window.addEventListener("keyup", keyboardHandler)
    return () => {
      window.removeEventListener("mouseup", mouseHandler)
      window.removeEventListener("keyup", keyboardHandler)
    }
  }, [])

  useClickOutside(detailsRef, () => setMenuOpen(false))

  return (
    <div className={s.outer}>
      <a
        href={selection?.href}
        target={selection?.target}
        className={`govuk-button lbh-button ${
          secondary && "govuk-button--secondary lbh-button--secondary"
        } ${s.button}`}
      >
        {!secondary && (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <rect
              x="4.5293"
              y="11"
              width="11"
              height="1.94118"
              transform="rotate(-90 4.5293 11)"
              fill="white"
            />
            <rect y="4.52942" width="11" height="1.94118" fill="white" />
          </svg>
        )}
        {selection?.title}
      </a>

      <details open={menuOpen} ref={detailsRef} data-testid="details">
        <summary
          onClick={e => {
            e.preventDefault()
            setMenuOpen(!menuOpen)
          }}
          className={`govuk-button lbh-button  ${
            secondary && "govuk-button--secondary lbh-button--secondary"
          } ${s.summary} ${secondary && s.summarySecondary}`}
        >
          <span className="govuk-visually-hidden">Select method</span>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" />
          </svg>
        </summary>

        <fieldset ref={fieldsetRef} className={s.fieldset}>
          <legend className="govuk-visually-hidden">{label}</legend>
          {choices.map((choice, i) => (
            <Choice
              key={i}
              name={name}
              value={i.toString()}
              label={choice.title}
              hint={choice.description}
              currentValue={currentValue}
              onChange={e => setCurrentValue(e.target.value)}
            />
          ))}
        </fieldset>
      </details>
    </div>
  )
}

export default MultiButton
