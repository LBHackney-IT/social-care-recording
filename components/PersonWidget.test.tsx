import PersonWidget from "./PersonWidget"
import { render, screen, fireEvent } from "@testing-library/react"

const mockHandler = jest.fn()
const mockHandler2 = jest.fn()

describe("PersonWidget", () => {
  it("renders correctly when there is a person", () => {
    render(
      <PersonWidget
        person={{
          firstName: "Foo",
          lastName: "Bar",
          dateOfBirth: "2021-04-14T10:14:00.87",
        }}
      />
    )

    expect(screen.getByText("Foo Bar"))
    expect(screen.getByText("Born 14 Apr 2021"))
  })

  it("renders correctly when there is no person", () => {
    render(<PersonWidget person={false} />)

    expect(screen.getByText("Person not found"))
  })

  it("calls the correct handlers when part of a collapsible group", () => {
    render(
      <PersonWidget
        grouped={true}
        open={false}
        setOpen={mockHandler}
        onRemove={mockHandler2}
        index={1}
        person={{
          firstName: "Foo",
          lastName: "Bar",
          dateOfBirth: "2021-04-14T10:14:00.87",
        }}
      />
    )

    fireEvent.click(screen.getByText("Foo Bar"))
    expect(mockHandler).toBeCalled()
    expect(mockHandler).toBeCalledWith(1)

    fireEvent.click(screen.getByText("Remove"))
    expect(mockHandler2).toBeCalled()
    expect(mockHandler2).toBeCalledWith(1)
  })
})
