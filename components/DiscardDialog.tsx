import Dialog from "./Dialog"
import { useState } from "react"
import Banner from "../components/Banner"

interface Props {
  submissionId: string
}

const DiscardDialog = ({ submissionId }: Props): React.ReactElement => {
  const [status, setStatus] = useState<string | false>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleDiscard = async (): Promise<void> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${submissionId}`,
        {
          method: "DELETE",
        }
      )
      const data = await res.json()
      if (data.error) throw data.error
      window.location.href = "/"
    } catch (e) {
      setStatus(e.toString())
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="lbh-link">
        Discard
      </button>
      <Dialog
        title="Are you sure you want to discard this submission?"
        isOpen={open}
        onDismiss={() => setOpen(false)}
      >
        {status && (
          <Banner
            title="There was a problem discarding this submission"
            className="lbh-page-announcement--warning"
          >
            <p>Please refresh the page or try again later.</p>
            <p className="lbh-body-xs">{status}</p>
          </Banner>
        )}

        <p className="lbh-body">
          This will remove it for you and your colleagues.
        </p>

        <div className="lbh-dialog__actions">
          <button className="govuk-button lbh-button" onClick={handleDiscard}>
            Yes, discard
          </button>

          <button
            className="govuk-link lbh-link"
            onClick={() => setOpen(false)}
          >
            No, cancel
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default DiscardDialog
