import ComboboxField from "./ComboboxField"
import { Formik, Form } from "formik"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const choices = [
  {
    value: "1",
    label: "Foo option",
  },
  {
    value: "2",
    label: "Bar option",
  },
]

describe("ComboboxField", () => {
  it("renders correctly", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: false,
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <ComboboxField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
              choices={choices}
            />
          </Form>
        )}
      </Formik>
    )

    expect(screen.getByRole("combobox"))
    expect(screen.getAllByLabelText("Label text").length).toBe(2)
    expect(screen.getByText("Hint text"))

    userEvent.click(screen.getByRole("button"))

    expect(screen.getByText("Foo option"))
    expect(screen.getByText("Bar option"))
  })

  it("accepts an initial value/option", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: "1",
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <ComboboxField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
              choices={choices}
            />
          </Form>
        )}
      </Formik>
    )
    expect(screen.getByDisplayValue("Foo option"))
  })

  it("renders errors", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: "",
        }}
        initialTouched={{
          foo: true,
        }}
        initialErrors={{
          foo: "Example error",
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <ComboboxField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
              choices={choices}
            />
          </Form>
        )}
      </Formik>
    )
    expect(screen.getByText("Example error"))
  })
})
