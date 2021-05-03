import SubmissionsTable from "./SubmissionsTable"
import { render, screen } from "@testing-library/react"

describe("SubmissionsTable", () => {
  it("renders correctly", () => {
    render(
      <SubmissionsTable
        results={[
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
            discardedAt: null,
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
    expect(screen.getByRole("table"))
    expect(screen.getByText("12345"))
    expect(screen.getByText("Foo form"))
    expect(screen.getByText("14 Apr 2021"))
    expect(screen.getByText("example@email.com"))
  })
})
