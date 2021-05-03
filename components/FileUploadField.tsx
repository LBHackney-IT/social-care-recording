import s from "../styles/FileUploadField.module.scss"
import { useState } from "react"
import PreviewPanel from "./PreviewPanel"
import { getIn } from "formik"

interface FieldProps {
  touched
  errors
  name: string
  label: string
  type?: string
  hint?: string
  className?: string
  required?: boolean
  as?: string
  rows?: number
  multiple?: boolean
  setFieldValue: (string, any) => void
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  multiple,
  ...props
}: FieldProps): React.ReactElement => {
  const [files, setFiles] = useState([])

  const handleChange = acceptedFiles => {
    setFiles(
      [...acceptedFiles.target.files].map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const thumbs = files.map((file, i) => (
    <PreviewPanel
      key={i}
      src={file.preview}
      title={file.name}
      date={file.lastModified}
      // size={file.size}
    />
  ))

  return (
    <div
      className={`govuk-form-group lbh-form-group ${
        getIn(touched, name) && getIn(errors, name) && "govuk-form-group--error"
      }`}
    >
      <label htmlFor={name} className="govuk-label lbh-label">
        {label}
      </label>

      {hint && (
        <span id={`${name}-hint`} className="govuk-hint lbh-hint">
          {hint}
        </span>
      )}

      {touched[name] && errors[name] && (
        <p className="govuk-error-message lbh-error-message" role="alert">
          <span className="govuk-visually-hidden">Error:</span> {errors[name]}
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        multiple={multiple}
        name={name}
        id={name}
        className={`govuk-file-upload lbh-file-upload ${className}`}
        aria-describedby={hint && `${name}-hint`}
        {...props}
      />

      <aside className={s.previewArea}>{thumbs}</aside>
    </div>
  )
}

export default Field
