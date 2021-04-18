import PersonWidget from "./PersonWidget"
import { render, screen } from "@testing-library/react"

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
})
