import MultiButton from "./MultiButton"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn()

  global.Storage.prototype.getItem = jest
    .fn()
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce(JSON.stringify("1"))
})

const MockComponent = () => (
  <MultiButton
    name="example-key"
    label="Select something"
    choices={[
      {
        href: "#",
        title: "Foo",
        description: "Example description 1",
      },
      {
        href: "#",
        title: "Bar",
        description: "Example description 2",
      },
    ]}
  />
)

describe("MultiButton", () => {
  it("shows an initial value if there's nothing stored", () => {
    render(<MockComponent />)

    expect(screen.getAllByText("Foo").length).toBe(2)
    expect(screen.getAllByRole("radio").length).toBe(2)
  })

  it("allows a user to choose between options", () => {
    render(<MockComponent />)

    fireEvent.click(screen.getByText("Bar"))
    expect(screen.getAllByText("Bar").length).toBe(2)
  })

  it("remembers a non-default value", () => {
    render(<MockComponent />)

    expect(screen.getAllByText("Bar").length).toBe(2)
  })

  it("closes the details panel after an option is clicked", () => {
    render(<MockComponent />)

    expect(screen.getByTestId("details").getAttribute("open")).toBe(null)

    userEvent.click(screen.getByText("Select method"))
    expect(screen.getByTestId("details").getAttribute("open")).toBe("")

    userEvent.click(screen.getByText("Bar"))
    expect(screen.getByTestId("details").getAttribute("open")).toBe(null)
  })

  it("closes the details panel after the enter key is pressed", () => {
    render(<MockComponent />)

    userEvent.click(screen.getByText("Select method"))
    fireEvent.keyUp(screen.getByText("Bar"), { key: "Enter", code: "Enter" })
    expect(screen.getByTestId("details").getAttribute("open")).toBe(null)
  })
})
