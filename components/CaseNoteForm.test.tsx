import CaseNoteForm from "./CaseNoteForm"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

describe("CaseNoteForm", () => {
  it("renders correctly", () => {
    render(<CaseNoteForm onSubmit={() => {}} />)

    expect(screen.getByText("What kind of note is this?"))

    expect(screen.queryByText("What kind of visit?")).toBeNull()
    expect(screen.queryByText("What kind of correspondance?")).toBeNull()

    expect(screen.getByLabelText("What happened?"))
    expect(screen.getByText("Actions"))

    expect(screen.getByText("Save"))
  })

  it("shows the right conditional content", () => {
    render(<CaseNoteForm onSubmit={() => {}} />)

    fireEvent.click(screen.getByLabelText("Visit"))
    expect(screen.getByText("What kind of visit?"))

    fireEvent.click(screen.getByLabelText("Correspondance"))
    expect(screen.getByText("What kind of correspondance?"))

    fireEvent.click(screen.getByLabelText("Email, letter or text message"))
    expect(
      screen.getByText(
        "You don't need to copy and paste emails or text messages.",
        {
          exact: false,
        }
      )
    )
  })

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
