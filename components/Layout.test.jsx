import Layout from "./Layout"
import { render, screen } from "@testing-library/react"
import { useSession } from "../lib/auth"

jest.mock("../lib/auth")

describe("Layout", () => {
  it("renders correctly when signed out", () => {
    useSession.mockReturnValueOnce([false, false])

    render(<Layout />)
    expect(screen.getByText("Sign in"))
  })

  it("renders correctly when signed in", () => {
    useSession.mockReturnValueOnce([
      {
        user: {
          email: "foo@bar.com",
        },
      },
      false,
    ])

    render(<Layout />)
    expect(screen.getByText("You are signed in as foo@bar.com"))
    expect(screen.getByText("Sign out"))
  })
})
