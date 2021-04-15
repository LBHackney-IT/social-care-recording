import { useState, useCallback, useEffect } from "react"
import { useFormikContext } from "formik"
import { useRouter } from "next/router"

const Autosave = () => {
  const [isSaved, setIsSaved] = useState(null)
  const [saving, setSaving] = useState(false)

  const { values, isValid } = useFormikContext()
  const { query } = useRouter()

  const save = async values => {
    setSaving(true)
    console.log("SAVING ", values)
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${query.id}/steps/${query.stepId}`,
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify(values),
    //   }
    // )
    // const data = await res.json()
    setSaving(false)
  }

  const debounce = (func, wait, immediate) => {
    let timeout
    return function () {
      var context = this,
        args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  const debouncedSave = useCallback(
    debounce(
      () => {
        return save(values).then(() => setIsSaved(true))
      },
      5000,
      false
    ),
    []
  )

  useEffect(() => debouncedSave, [debouncedSave, values])

  if (saving) return <p className="lbh-body-s">Saving changes...</p>

  if (isSaved) return <p className="lbh-body-s">Changes saved</p>

  return <p className="lbh-body-s">Unsaved changes</p>
}

export default Autosave
