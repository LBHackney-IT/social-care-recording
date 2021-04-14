import RadioField from "./RadioField"
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

describe("RadioField", () => {
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
            <RadioField
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

    expect(screen.getAllByRole("radio").length).toBe(2)

    expect(screen.getByText("Label text"))

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
            <RadioField
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

    const chosenChoice = screen.getByLabelText("Foo option") as HTMLInputElement
    expect(chosenChoice.checked).toBe(true)
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
          <RadioField
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
