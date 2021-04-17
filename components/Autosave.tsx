import { useState, useCallback, useEffect } from "react"
import { useFormikContext } from "formik"
import { useRouter } from "next/router"
import { debounce } from "../lib/helpers"
import s from "../styles/Autosave.module.scss"
import useWarnUnsavedChanges from "../hooks/useWarnUnsavedChanges"

interface Props {
  delay?: number
}

const Autosave = ({ delay = 1000 }: Props): React.ReactElement => {
  const { query } = useRouter()
  const { dirty, values, errors, validateForm } = useFormikContext()

  const [saved, setSaved] = useState<Boolean>(true)
  const [saving, setSaving] = useState<Boolean>(false)

  useWarnUnsavedChanges(!saved)

  const save = async (): Promise<void> => {
    const errors = await validateForm()

    if (Object.entries(errors).length === 0) {
      setSaving(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${query.id}/steps/${query.stepId}`,
        {
          method: "PATCH",
          body: JSON.stringify(values),
        }
      )
      const data = await res.json()
      setSaving(false)
      setSaved(true)
    }
  }

  const debounceCallback = useCallback(debounce(save, delay), [])

  useEffect(() => {
    if (dirty) setSaved(false)
    debounceCallback()
  }, [values])

  return (
    <div className={s.outer} aria-live="polite">
      {saving && (
        <img
          src="/spinner.svg"
          alt=""
          aria-hidden="true"
          className={s.spinner}
        />
      )}
      <p className={`lbh-body-s ${s.text}`}>
        {saving && "Saving changes..."}
        {saved && "Changes saved"}
        {!saved && !saving && "Unsaved changes"}
      </p>
    </div>
  )
}

export default Autosave
