import { prettyDateAndTime } from "../lib/formatters"
import { Revision } from "@prisma/client"
import s from "../styles/RevisionTimeline.module.scss"

interface Props {
  revisions: Revision[]
  totalSteps: number
}

const RevisionTimeline = ({
  revisions,
  totalSteps,
}: Props): React.ReactElement => (
  <ol className={`lbh-timeline ${s.timeline}`}>
    {revisions.map(revision => (
      <li
        className={`lbh-timeline__event lbh-timeline__event--minor ${s.event}`}
        key={revision.id}
      >
        <h3 className="lbh-body">{revision.createdBy}</h3>

        <p className="lbh-body-xs">
          {prettyDateAndTime(revision.createdAt.toString())} (
          {Math.round((revision.completedSteps.length / totalSteps) * 100)}%)
        </p>
      </li>
    ))}
  </ol>
)

export default RevisionTimeline
