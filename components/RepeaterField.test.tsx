import RepeaterField from "./RepeaterField"
import { Formik, Form } from "formik"
import { render, screen } from "@testing-library/react"

describe("RepeaterField", () => {
  it("renders no items correctly", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: [],
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <RepeaterField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    )

    expect(screen.queryByRole("textbox")).toBeNull()

    expect(screen.getAllByText("Label text"))

    expect(screen.getByText("Hint text"))

    expect(screen.getByText("Add an item"))
  })

  it("renders initial values correctly", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: ["one", "two", "three"],
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <RepeaterField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    )

    expect(screen.getAllByRole("textbox").length).toBe(3)

    expect(screen.getByDisplayValue("one"))
    expect(screen.getByDisplayValue("two"))
    expect(screen.getByDisplayValue("three"))

    expect(screen.getByText("Add another item"))
  })

  it("renders errors", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: ["one", "two", "three"],
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <RepeaterField
              touched={{
                foo: true,
              }}
              errors={{
                foo: "Example error",
              }}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    )
    expect(screen.getByText("Example error"))
  })
})