import useLocalStorage from "./useLocalStorage"
import { fireEvent, render, screen } from "@testing-library/react"

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn()

  global.Storage.prototype.getItem = jest
    .fn()
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce(JSON.stringify("saved value"))
    .mockReturnValueOnce(undefined)
})

const MockComponent = () => {
  const [foo, setFoo] = useLocalStorage("foo", "initial value")
  return (
    <>
      {foo}
      <button onClick={() => setFoo("new value")} />
    </>
  )
}

describe("useLocalStorage", () => {
  it("returns the default value if there is nothing in localstorage", () => {
    render(<MockComponent />)
    expect(screen.getByText("initial value"))
    expect(global.Storage.prototype.getItem).toBeCalled()
  })

  it("it returns the saved value if in localstorage", () => {
    render(<MockComponent />)
    expect(screen.getByText("saved value"))
    expect(global.Storage.prototype.getItem).toBeCalled()
  })

  it("displays and saves a changed value", () => {
    render(<MockComponent />)
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("new value"))
    expect(global.Storage.prototype.setItem).toBeCalledWith(
      "foo",
      JSON.stringify("new value")
    )
  })
})
