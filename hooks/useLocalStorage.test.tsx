import useLocalStorage from "./useLocalStorage"
import { render, screen } from "@testing-library/react"

const MockComponent = () => {
  const [foo, setFoo] = useLocalStorage("foo", false)
  return null
}

describe("useLocalStorage", () => {
  it("", () => {
    render(<MockComponent />)
  })
})
