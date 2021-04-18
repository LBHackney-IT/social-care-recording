import { generateFlexibleSchema } from "./validators"

describe("generateFlexibleSchema", () => {
  it("handles different field types", async () => {
    const schema = generateFlexibleSchema([
      {
        id: "one",
        type: "text",
      },
      {
        id: "two",
        type: "textarea",
      },
      {
        id: "three",
        type: "checkboxes",
      },
      {
        id: "four",
        type: "repeater",
      },
      {
        id: "five",
        type: "select",
      },
      {
        id: "six",
        type: "radio",
      },
    ])

    const result = await schema.validate({
      one: "value",
      two: "value",
      three: ["example", "example 2"],
      four: ["example", "example 2"],
      five: "value",
      six: "value",
    })

    expect(result).toBeTruthy()
  })

  it("handles required fields", async () => {
    const schema = generateFlexibleSchema([
      {
        id: "one",
        type: "text",
        required: true,
      },
    ])

    await expect(
      schema.validate({
        one: "",
      })
    ).rejects.toThrow()

    const schema2 = generateFlexibleSchema([
      {
        id: "one",
        type: "checkboxes",
        required: true,
      },
    ])

    await expect(
      schema2.validate({
        one: [],
      })
    ).rejects.toThrow()
  })

  it("handles custom error messages", async () => {
    const schema = generateFlexibleSchema([
      {
        id: "one",
        type: "text",
        required: true,
        error: "Example error message",
      },
    ])

    await expect(
      schema.validate({
        one: "",
      })
    ).rejects.toThrowError("Example error message")
  })
})
