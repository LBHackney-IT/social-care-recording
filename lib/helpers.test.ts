import { groupByTheme, formsToChoices, pushUnique } from "./helpers"

const form = {
  id: "1",
  name: "Example form",
  steps: [
    {
      id: "1",
      name: "First example step",
      fields: [],
      theme: "First theme",
    },
    {
      id: "2",
      name: "Second example step",
      fields: [],
      theme: "First theme",
    },
    {
      id: "3",
      name: "Second example step",
      fields: [],
      theme: "Second theme",
    },
  ],
}

describe("groupByTheme", () => {
  it("themes things correctly", () => {
    const result = groupByTheme(form)
    expect(result[0].name).toEqual("First theme")
    expect(result[0].steps.length).toEqual(2)
    expect(result[1].name).toEqual("Second theme")
    expect(result[1].steps.length).toEqual(1)
  })
})

describe("formsToChoices", () => {
  it("converts correctly", () => {
    const result = formsToChoices([form, form])
    expect(result).toEqual([
      {
        value: "1",
        label: "Example form",
      },
      {
        value: "1",
        label: "Example form",
      },
    ])
  })
})

describe("pushUnique", () => {
  it("removes duplicates", () => {
    const result = pushUnique(["one", "two", "three", "three"], "three")
    expect(result).toEqual(["one", "two", "three"])
  })

  it("leaves arrays without duplicates alone", () => {
    const result = pushUnique(["one", "two", "three", "four"], "five")
    expect(result).toEqual(["one", "two", "three", "four", "five"])
  })
})
