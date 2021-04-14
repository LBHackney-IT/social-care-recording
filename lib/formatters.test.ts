import { prettyDate } from "./formatters"

describe("prettyDate", () => {
  it("correctly formats an ISO date string", () => {
    const result = prettyDate("1990-04-10T00:00:00.0000000")
    expect(result === "10 Apr 1990")
  })

  it("prints nothing if fed an unparsable string", () => {
    const result = prettyDate("blah")
    expect(result === "")
  })
})
