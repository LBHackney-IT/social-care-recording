import StartForm from "./StartForm"
import { render, screen } from "@testing-library/react"

describe("Layout", () => {
  it("renders the correct fields", () => {
    render(
      <StartForm
        formOptions={[
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
        onSubmit={() => {}}
      />
    )
    expect(screen.getByLabelText("Social care ID"))
    expect(screen.getByLabelText("What do you want to start?"))
  })
})
