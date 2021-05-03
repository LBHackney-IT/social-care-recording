import StartForm from "./StartForm"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

describe("StartForm", () => {
  it("renders the correct fields", () => {
    render(
      <StartForm
        forms={[
          {
            id: "foo",
            name: "Foo",
            steps: [],
          },
          {
            id: "bar",
            name: "Bar",
            steps: [],
          },
        ]}
        onSubmit={() => true}
      />
    )
    expect(screen.getByLabelText("Social care ID"))
    expect(screen.getByLabelText("What do you want to start?"))
  })

  it("shows an error if submission fails", async () => {
    render(
      <StartForm
        forms={[
          {
            id: "foo",
            name: "Foo",
            steps: [],
          },
          {
            id: "bar",
            name: "Bar",
            steps: [],
          },
        ]}
        onSubmit={(values, { setStatus }) =>
          setStatus("Example status message")
        }
      />
    )

    fireEvent.change(screen.getByLabelText("Social care ID"), {
      target: { value: 123 },
    })
    fireEvent.click(screen.getByText("Continue"))

    await waitFor(() => {
      expect(screen.getByRole("alert"))
      expect(screen.getByText("Example status message"))
    })
  })
})
