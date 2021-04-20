import CaseNoteForm from "./CaseNoteForm"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

describe("CaseNoteForm", () => {
  it("renders correctly", () => {})

  it("shows the right conditional fields", () => {})

  it("shows an error if submission fails", async () => {
    render(
      <CaseNoteForm
        onSubmit={(values, { setStatus }) =>
          setStatus("Example status message")
        }
      />
    )

    fireEvent.click(screen.getByLabelText("Something else"))

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText("What happened?"), {
        target: { value: "test value" },
      })
    })

    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(screen.getByRole("alert"))
      expect(screen.getByText("Example status message"))
    })
  })
})
