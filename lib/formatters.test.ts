import {
  prettyDate,
  prettyDateAndTime,
  prettyDateFromMillis,
  prettyFileSize,
} from "./formatters"

describe("prettyDate", () => {
  it("correctly formats ISO date strings", () => {
    const result = prettyDate("1990-04-10T00:00:00.0000000")
    expect(result).toEqual("10 Apr 1990")

    const result2 = prettyDate("2021-12-08T12:55:00.0000000")
    expect(result2).toEqual("8 Dec 2021")
  })

  it("prints nothing if fed an unparsable string", () => {
    const result = prettyDate("blah")
    expect(result).toBe("")
  })
})

describe("prettyDateAndTime", () => {
  it("correctly formats ISO timedate strings", () => {
    const result = prettyDateAndTime("1990-04-10T00:00:00.0000000")
    expect(result).toEqual("10 Apr 1990 12.00 AM")

    const result2 = prettyDateAndTime("2021-12-08T13:55:00.0000000")
    expect(result2).toEqual("8 Dec 2021 1.55 PM")
  })

  it("prints nothing if fed an unparsable string", () => {
    const result = prettyDateAndTime("blah")
    expect(result).toBe("")
  })
})

describe("prettyDateFromMillis", () => {
  it("correctly formats millisecond dates", () => {
    const result = prettyDateFromMillis(1000000000000)
    expect(result).toEqual("9 Sep 2001")

    const result2 = prettyDateFromMillis(2000000000000)
    expect(result2).toEqual("18 May 2033")
  })
})

describe("File size helper", () => {
  it("returns correct strings with the right number of decimal places", () => {
    expect(prettyFileSize(0)).toEqual("0.0 B")
    expect(prettyFileSize(1024)).toEqual("1.0 KB")
    expect(prettyFileSize(1073741824)).toEqual("1.0 GB")
  })
})
