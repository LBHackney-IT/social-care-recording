import SubmissionRow from "./SubmissionRow"
import { fireEvent, render, screen } from "@testing-library/react"

const mockHandler = jest.fn()

const mockSubmission = {
  id: "1",
  socialCareId: 12345,
  formId: "A",
  createdBy: "example@email.com",
  answers: {},
  editedBy: ["example@email.com", "foo@bar.com"],
  createdAt: "2021-04-14T10:14:00.87" as unknown as Date,
  updatedAt: new Date(),
  discardedAt: null,
  submittedAt: null,
  completedSteps: [],
  form: {
    id: "",
    name: "Foo form",
    steps: [],
  },
  revisions: [],
}

describe("SubmissionRow", () => {
  it("renders correctly when collapsed", () => {
    render(
      <table>
        <tbody>
          <SubmissionRow
            setExpanded={mockHandler}
            expanded={false}
            submission={mockSubmission}
          />
        </tbody>
      </table>
    )
    expect(screen.getByText("Foo form"))
    expect(screen.queryAllByText("14 Apr 2021 10.14 AM").length).toBe(0)
  })

  it("renders correctly when expanded", () => {
    render(
      <table>
        <tbody>
          <SubmissionRow
            setExpanded={mockHandler}
            expanded={true}
            submission={mockSubmission}
          />
        </tbody>
      </table>
    )
    expect(screen.getByText("Foo form"))
    expect(screen.queryAllByText("14 Apr 2021 10.14 AM").length).toBe(1)
  })

  it("triggers the expand handler", () => {
    render(
      <table>
        <tbody>
          <SubmissionRow
            setExpanded={mockHandler}
            expanded={true}
            submission={mockSubmission}
          />
        </tbody>
      </table>
    )
    expect(mockHandler).toBeCalledTimes(0)
    fireEvent.click(screen.getAllByRole("button")[0])
    expect(mockHandler).toBeCalledTimes(1)
  })

  it("only shows collaborators who are not the creator", () => {
    render(
      <table>
        <tbody>
          <SubmissionRow
            setExpanded={mockHandler}
            expanded={true}
            submission={{
              ...mockSubmission,
              editedBy: ["example@email.com", "foo@bar.com"],
            }}
          />
        </tbody>
      </table>
    )
    expect(screen.getAllByText("example@email.com").length).toBe(1)
    expect(screen.getByText("foo@bar.com"))
  })
})
