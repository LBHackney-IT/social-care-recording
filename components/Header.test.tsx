import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import Header from "./Header"

jest.mock("../lib/auth", () => {
  return {
    useSession: () => [
      {
        name: "Foo",
      },
      false,
    ],
  }
})

describe("Header", () => {
  it("renders the correct fields", () => {
    render(<Header />)
    expect(screen.getByText("Foo"))
    expect(screen.getByText("Sign out"))
  })
})
