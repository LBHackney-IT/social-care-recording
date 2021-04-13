import Layout from "./Layout"
import { render, screen } from "@testing-library/react"
import { useSession } from "../lib/auth"

jest.mock("../lib/auth")

describe("Layout", () => {
  it("renders correctly when signed out", () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([false, false])

    render(
      <Layout>
        <h1>Test content</h1>
      </Layout>
    )
    expect(screen.getByText("Sign in"))
    expect(screen.getByText("Test content"))
  })

  it("renders correctly when signed in", () => {
    ;(useSession as jest.Mock).mockReturnValueOnce([
      {
        email: "foo@bar.com",
      },
      false,
    ])

    render(
      <Layout>
        <h1>Test content</h1>
      </Layout>
    )
    expect(screen.getByText("You are signed in as foo@bar.com"))
    expect(screen.getByText("Sign out"))
  })
})
