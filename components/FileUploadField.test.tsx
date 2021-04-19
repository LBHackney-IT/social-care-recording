import FileUploadField from "./FileUploadField"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

global.URL.createObjectURL = jest.fn(() => "http://fake.url/here")

describe("FileUploadField", () => {
  const mockHandler = jest.fn()
  const mockImage = new File(["example"], "file.jpg", { type: "image/jpeg" })

  it("renders correctly", () => {
    render(
      <FileUploadField
        touched={{}}
        errors={{}}
        name="foo"
        label="Example label"
        hint="Example hint"
        setFieldValue={mockHandler}
      />
    )

    expect(screen.getByLabelText("Example label"))
    expect(screen.getByText("Example hint"))
  })

  it("accepts and previews multiple image files", async () => {
    render(
      <FileUploadField
        touched={{}}
        errors={{}}
        name="foo"
        label="Example label"
        hint="Example hint"
        setFieldValue={mockHandler}
      />
    )

    Object.defineProperty(screen.getByLabelText("Example label"), "files", {
      value: [mockImage, mockImage],
    })
    fireEvent.change(screen.getByLabelText("Example label"))

    expect(screen.getAllByRole("figure").length).toEqual(2)

    // TODO: it doesn't actually do this yet
    // expect(mockHandler).toBeCalled()
  })

  it("renders errors", () => {
    render(
      <FileUploadField
        touched={{ foo: true }}
        errors={{ foo: "Example error" }}
        name="foo"
        label="Example label"
        setFieldValue={mockHandler}
      />
    )

    expect(screen.getByText("Example error"))
  })
})
