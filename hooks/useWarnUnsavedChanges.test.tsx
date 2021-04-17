import useWarnUnsavedChanges from "./useWarnUnsavedChanges"
import { render } from "@testing-library/react"
import Router from "next/router"

let routeChangeStart

window.confirm = jest.fn()

Router.events.on = jest.fn((event, callback) => {
  routeChangeStart = callback
})

const MockComponent = ({ unsavedChanges }) => {
  useWarnUnsavedChanges(unsavedChanges)
  return null
}

// these tests aren't perfect but testing for a thrown error gets very complicated very quickly
// next doesn't have a good way to abort/cancel a pending route change without throwing an error
describe("useWarnUnsavedChanges", () => {
  it("does nothing when there are no unsaved changes", () => {
    expect(() => {
      render(<MockComponent unsavedChanges={false} />)
      routeChangeStart()
    }).not.toThrow()
  })

  it("can cancel routing when there are unsaved changes", () => {
    expect(() => {
      render(<MockComponent unsavedChanges={true} />)
      routeChangeStart()
    }).toThrow("routeChange aborted")
  })

  it("can show a confirmation warning", () => {
    try {
      render(<MockComponent unsavedChanges={true} />)
      routeChangeStart()
    } catch (e) {}
    expect(window.confirm).toBeCalled()
  })
})
