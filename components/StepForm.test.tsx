import StepForm from "./StepForm"
import { AutosaveProvider } from "../contexts/autosaveContext"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

describe("StepForm", () => {
  it("renders the correct fields", () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={[
            {
              id: "one",
              question: "Test question",
              required: true,
              type: "text",
            },
          ]}
          onSubmit={(values, { setStatus }) =>
            setStatus("Example status message")
          }
        />
      </AutosaveProvider>
    )
    expect(screen.getByLabelText("Test question"))
    expect(screen.getByText("Save changes"))
  })

  it("shows an error if submission fails", async () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={[
            {
              id: "one",
              question: "Test question",
              required: true,
              type: "text",
            },
          ]}
          onSubmit={(values, { setStatus }) =>
            setStatus("Example status message")
          }
        />
      </AutosaveProvider>
    )

    fireEvent.change(screen.getByLabelText("Test question"), {
      target: { value: "test value" },
    })
    fireEvent.click(screen.getByText("Save changes"))

    await waitFor(() => {
      expect(screen.getByRole("alert"))
      expect(screen.getByText("Example status message"))
    })
  })
})
