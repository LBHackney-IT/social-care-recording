import { useState, useCallback } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import "@reach/listbox/styles.css"
import s from "../styles/Multibutton.module.scss"

interface Props {
  choices: {
    href: string
    title: string
    description: string
  }[]
}

const Multibutton = ({ choices }): React.ReactElement => {
  const [currentValue, setCurrentValue] = useLocalStorage(
    "lbh-default-record",
    "0"
  )

  const selection = choices[currentValue]

  return (
    <div className={s.outer}>
      <a
        href={selection?.href}
        className={`govuk-button lbh-button ${s.button}`}
      >
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

        {selection?.title}
      </a>

      <label className="govuk-visually-hidden" id="multibutton-label">
        What do you want to record?
      </label>

      <ListboxInput
        aria-labelledby="multibutton-label"
        value={currentValue}
        onChange={value => setCurrentValue(value)}
      >
        <ListboxButton className={`govuk-button lbh-button ${s.listbox}`}>
          <span className="govuk-visually-hidden">
            Selected: {selection?.title}
          </span>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" />
          </svg>
        </ListboxButton>
        <ListboxPopover className={s.popover} style={{ width: "inherit" }}>
          <ListboxList>
            {choices.map((choice, i) => (
              <ListboxOption value={i.toString()} key={i} className={s.option}>
                {currentValue === i && (
                  <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                    <path
                      d="M1 5.5L5.33333 10L14 1"
                      stroke="#00664F"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <p className={`lbh-body-s ${s.title}`}>{choice.title}</p>
                <p className={`lbh-body-xs ${s.description}`}>
                  {choice.description}
                </p>
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

export default Multibutton
