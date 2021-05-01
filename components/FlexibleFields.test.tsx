import FlexibleFields from "./FlexibleFields"
import { Formik, Form, Field } from "formik"
import { fireEvent, render, screen } from "@testing-library/react"

describe("TextField", () => {
  it("returns a normal field", () => {
    render(
      <Formik onSubmit={null} initialValues={{}}>
        <FlexibleFields
          field={{ id: "foo", type: "text" }}
          values={{}}
          touched={{}}
          errors={{}}
        />
      </Formik>
    )

    expect(screen.getByRole("textbox"))
  })

  it("shows conditional fields when the condition is met", () => {
    render(
      <Formik onSubmit={null} initialValues={{}}>
        <FlexibleFields
          field={{
            id: "foo",
            type: "text",
            condition: {
              id: "bar",
              value: "yes",
            },
          }}
          values={{ bar: "yes" }}
          touched={{}}
          errors={{}}
        />
      </Formik>
    )

    expect(screen.getByRole("textbox"))
  })

  it("hides conditional fields when the condition is not met", () => {
    render(
      <Formik onSubmit={null} initialValues={{}}>
        <FlexibleFields
          field={{
            id: "foo",
            type: "text",
            condition: {
              id: "bar",
              value: "yes",
            },
          }}
          values={{ bar: "" }}
          touched={{}}
          errors={{}}
        />
      </Formik>
    )

    expect(screen.queryByRole("textbox")).toBeNull()
  })

  it("renders nothing for an unsupported field type", () => {
    render(
      <Formik onSubmit={null} initialValues={{}}>
        <FlexibleFields
          field={{
            id: "foo",
            type: "whatever",
            label: "Test label",
          }}
          values={{}}
          touched={{}}
          errors={{}}
        />
      </Formik>
    )
    expect(screen.queryByText("Test label")).toBeNull()
  })
})
