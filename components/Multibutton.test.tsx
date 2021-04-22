import Multibutton from "./Multibutton"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
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
  <Multibutton
    storageKey="example-key"
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

describe("Multibutton", () => {
  it("shows an initial value if there's nothing stored", async () => {
    render(<MockComponent />)

    expect(screen.getByText("Selected: Foo"))
  })

  it("allows a user to choose between options", async () => {
    render(<MockComponent />)

    // this reach-ui component seems to need userEvent
    // https://github.com/reach/reach-ui/issues/727
    userEvent.click(screen.getByRole("button"))
    userEvent.click(screen.getByText("Bar"))
    expect(screen.getByText("Selected: Bar"))
  })

  it("allows a user to choose between options", async () => {
    render(<MockComponent />)

    expect(screen.getByText("Selected: Bar"))
  })
})
