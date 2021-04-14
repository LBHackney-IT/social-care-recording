import { Person } from "../lib/socialCareApi.types"
import s from "../styles/PersonWidget.module.scss"
import { prettyDate } from "../lib/formatters"

interface Props {
  person: Person
}

const PersonWidget = ({ person }: Props): React.ReactElement => (
  <aside className={s.aside}>
    <h2 className={`lbh-heading-h3 ${s.title}`}>
      {person.firstName} {person.lastName}
    </h2>

    <p className={`lbh-body-s ${s.paragraph}`}>Referred 12 Feb 2021</p>
    <p className={`lbh-body-s ${s.paragraph}`}>
      Born {prettyDate(person.dateOfBirth)}
    </p>
    <p className={`lbh-body-s ${s.paragraph}`}>5 known relationships</p>

    <p className={`lbh-body-s ${s.important}`}>
      <strong>1 warning</strong> <span>2 open actions</span>
    </p>
  </aside>
)

export default PersonWidget
