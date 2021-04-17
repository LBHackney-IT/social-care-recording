import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import AutosaveContext, {
  AutosaveProvider,
  AutosaveIndicator,
} from "./autosaveContext"

describe("AutosaveProvider", () => {
  it("returns children", () => {
    render(<AutosaveProvider>Test</AutosaveProvider>)
    expect(screen.getByText("Test"))
  })
})

describe("AutosaveIndicator", () => {
  it("correctly shows when changes are saved", () => {
    render(
      <AutosaveContext.Provider value={{ saved: true, saving: false }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    )
    expect(screen.getByText("Changes saved"))
  })

  it("correctly shows when saving is in progress", () => {
    render(
      <AutosaveContext.Provider value={{ saved: false, saving: true }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    )
    expect(screen.getByText("Saving changes..."))
  })

  it("correctly shows when there are unsaved changes", () => {
    render(
      <AutosaveContext.Provider value={{ saved: false, saving: false }}>
        <AutosaveIndicator />
      </AutosaveContext.Provider>
    )
    expect(screen.getByText("Unsaved changes"))
  })
})
