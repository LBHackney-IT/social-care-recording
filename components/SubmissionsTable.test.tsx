import SubmissionsTable from "./SubmissionsTable"
import { render, screen } from "@testing-library/react"

describe("SubmissionsTable", () => {
  it("renders correctly", () => {
    render(
      <SubmissionsTable
        unfinishedSubmissions={[
          {
            id: "1",
            socialCareId: 12345,
            formId: "A",
            createdBy: "example@email.com",
            answers: {},
            editedBy: [],
            createdAt: ("2021-04-14T10:14:00.87" as unknown) as Date,
            updatedAt: new Date(),
            submittedAt: null,
            completedSteps: [],
            form: {
              id: "",
              name: "Foo form",
              steps: [],
            },
          },
        ]}
      />
    )
    expect(screen.getByText("12345"))
    expect(screen.getByText("Foo form"))
    expect(screen.getByText("14 Apr 2021"))
    expect(screen.getByText("example@email.com"))
  })

  it("only shows collaborators who are not the creator", () => {
    render(
      <SubmissionsTable
        unfinishedSubmissions={[
          {
            id: "1",
            socialCareId: 12345,
            formId: "A",
            createdBy: "example@email.com",
            answers: {},
            editedBy: ["example@email.com", "foo@bar.com"],
            createdAt: ("2021-04-14T10:14:00.87" as unknown) as Date,
            updatedAt: new Date(),
            submittedAt: null,
            completedSteps: [],
            form: {
              id: "",
              name: "Foo form",
              steps: [],
            },
          },
        ]}
      />
    )
    expect(screen.getAllByText("example@email.com").length).toBe(1)
    expect(screen.getByText("foo@bar.com"))
  })
})
