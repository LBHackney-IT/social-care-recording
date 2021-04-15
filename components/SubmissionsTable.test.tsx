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
            data: {},
            editedBy: [],
            createdAt: ("2021-04-14T10:14:00.87" as unknown) as Date,
            updatedAt: new Date(),
            submittedAt: null,
            completedSteps: [],
          },
        ]}
      />
    )
    expect(screen.getByText("12345"))
    expect(screen.getByText("14 Apr 2021 by example@email.com"))
  })
})
