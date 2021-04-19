import PreviewPanel from "./PreviewPanel"
import { render, screen } from "@testing-library/react"

describe("PreviewPanel", () => {
  it("renders correctly with a filesize", () => {
    render(
      <PreviewPanel
        src="http://fake.url/to/image"
        title="Example.jpg"
        size={10000}
      />
    )

    expect(screen.getByRole("figure"))
    expect(screen.getByRole("img"))
    expect(screen.getByText("Example.jpg"))
    expect(screen.getByText("9.8 KB"))
  })

  it("renders correctly with a sate", () => {
    render(
      <PreviewPanel
        src="http://fake.url/to/image"
        title="Example.jpg"
        date={1000000000000}
      />
    )

    expect(screen.getByRole("figure"))
    expect(screen.getByRole("img"))
    expect(screen.getByText("Example.jpg"))
    expect(screen.getByText("9 Sep 2001"))
  })
})
