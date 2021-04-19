import { prettyDateFromMillis, prettyFileSize } from "../lib/formatters"
import s from "../styles/FileUploadField.module.scss"

interface PreviewProps {
  src: string
  title: string
  date?: number
  size?: number
}

const PreviewPanel = ({
  src,
  title,
  date,
  size,
}: PreviewProps): React.ReactElement => (
  <figure className={s.figure}>
    <img className={s.image} src={src} alt="" />
    <figcaption className={`lbh-body-xs ${s.caption}`}>
      <strong className={s.title}>{title}</strong>
      <span className={`lbh-body-xs ${s.meta}`}>
        {date && prettyDateFromMillis(date)}
      </span>
      <span className={`lbh-body-xs ${s.meta}`}>
        {size && prettyFileSize(size)}
      </span>
    </figcaption>
  </figure>
)

export default PreviewPanel
