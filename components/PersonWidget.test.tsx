import PersonWidget from "./PersonWidget"
import { render, screen } from "@testing-library/react"

describe("PersonWidget", () => {
  it("renders correctly", () => {
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
})
