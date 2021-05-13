import { render, screen } from "@testing-library/react"
import RevisionTimeline from "./RevisionTimeline"

describe("RevisionTimeline", () => {
  it("renders correctly", () => {
    render(
      <RevisionTimeline
        revisions={[
          {
            id: "1",
            submissionId: "1",
            createdBy: "test@user.com",
            completedSteps: ["one", "two"],
            createdAt: "2021-04-14T14:15:00.00" as unknown as Date,
          },
          {
            id: "2",
            submissionId: "1",
            createdBy: "test2@user.com",
            completedSteps: ["one"],
            createdAt: "2021-04-13T10:00:00.00" as unknown as Date,
          },
        ]}
        totalSteps={3}
      />
    )

    expect(screen.queryAllByRole("listitem").length).toBe(2)

    expect(screen.getByText("test@user.com"))
    expect(screen.getByText("14 Apr 2021 2.15 PM (67%)"))

    expect(screen.getByText("test2@user.com"))
    expect(screen.getByText("13 Apr 2021 10.00 AM (33%)"))
  })
})
