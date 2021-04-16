import SelectField from "./SelectField"
import { Formik, Form } from "formik"
import { render, screen } from "@testing-library/react"

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

describe("SelectField", () => {
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
            <SelectField
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
    expect(screen.getByLabelText("Label text"))
    expect(screen.getByText("Hint text"))

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
            <SelectField
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
      >
        <Form>
          <SelectField
            touched={{
              foo: true,
            }}
            errors={{
              foo: "Example error",
            }}
            name="foo"
            label="Label text"
            hint="Hint text"
            choices={choices}
          />
        </Form>
      </Formik>
    )
    expect(screen.getByText("Example error"))
  })
})
