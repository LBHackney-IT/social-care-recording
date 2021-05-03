import StepForm from "./StepForm"
import { AutosaveProvider } from "../contexts/autosaveContext"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

const mockPush = jest.fn()

const useRouter = jest.spyOn(require("next/router"), "useRouter")

useRouter.mockImplementation(() => ({
  push: mockPush,
  query: {
    id: "foo",
  },
}))

const mockFields = [
  {
    id: "one",
    question: "Test question",
    required: true,
    type: "text",
  },
]

describe("StepForm", () => {
  it("renders the correct fields", () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
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
          fields={mockFields as any}
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
      expect(mockPush).toBeCalledTimes(0)
    })
  })

  it("returns to the task list if submission succeeds", async () => {
    render(
      <AutosaveProvider>
        <StepForm
          person={{}}
          fields={mockFields as any}
          onSubmit={() => true}
        />
      </AutosaveProvider>
    )

    fireEvent.change(screen.getByLabelText("Test question"), {
      target: { value: "test value" },
    })
    fireEvent.click(screen.getByText("Save changes"))

    await waitFor(() => {
      expect(mockPush).toBeCalledTimes(1)
      expect(mockPush).toBeCalledWith(`/submissions/foo`)
    })
  })
})
