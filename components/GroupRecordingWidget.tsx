import { Person } from "../lib/socialCareApi.types"
import { useState } from "react"
import PersonWidget from "./PersonWidget"
import Dialog from "./Dialog"
import s from "../styles/PersonWidget.module.scss"

interface Props {
  initialPerson: Person
}

const GroupRecordingWidget = ({ initialPerson }: Props): React.ReactElement => {
  const [people, setPeople] = useState([].concat(initialPerson))
  const [open, setOpen] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAdd = () => {
    setPeople(people.concat(people[0]))
    setOpen(people.length)
    setDialogOpen(false)
  }

  const handleRemove = index => {
    const newArray = people.slice()
    newArray.pop()
    setPeople(newArray)
    setOpen(people.length - 1)
  }

  return (
    <section>
      <h3 className="govuk-visually-hidden">People</h3>
      {people.map((person, i) => (
        <PersonWidget
          person={person}
          key={i}
          index={i}
          grouped={people.length > 1}
          onRemove={handleRemove}
          open={open === i}
          setOpen={setOpen}
        />
      ))}
      <button
        className={`lbh-link ${s.addPersonLink}`}
        onClick={() => setDialogOpen(true)}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7" width="1" height="15" fill="#025EA6" />
          <rect
            x="15"
            y="7"
            width="1"
            height="15"
            transform="rotate(90 15 7)"
            fill="#025EA6"
          />
        </svg>
        Add another person
      </button>

      <Dialog
        title="Add a person"
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
      >
        <div className="govuk-form-group lbh-form-group">
          <label className="govuk-label lbh-label" htmlFor="query">
            Search by name, contact detail or social care ID
          </label>
          <input
            className="govuk-input lbh-input"
            id="query"
            name="query"
            type="text"
            placeholder="eg. 123456"
          />
        </div>

        <button className="govuk-button lbh-button" onClick={handleAdd}>
          Add person
        </button>
      </Dialog>
    </section>
  )
}

export default GroupRecordingWidget
