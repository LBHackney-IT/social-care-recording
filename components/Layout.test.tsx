import Layout from "./Layout"
import { render, screen } from "@testing-library/react"
import { useSession } from "../lib/auth"

jest.mock("../lib/auth")

describe("Layout", () => {
  it("renders correctly", () => {
    (useSession as jest.Mock).mockReturnValueOnce([false, false])

    render(
      <Layout postheader={<h2>Test postheader content</h2>}>
        <h1>Test content</h1>
      </Layout>
    )
    expect(screen.getByText("Test postheader content"))
    expect(screen.getByText("Test content"))
  })
})
