const csv = require("csvtojson")
const rawSlugify = require("slugify")
const fs = require("fs")

const slugify = string => rawSlugify(string, { lower: true })

// take a flat csv and turn it into the json format we need for our forms config
const run = async () => {
  try {
    const rows = await csv().fromFile("./jobs/data.csv")
    // remove example row from data
    rows.shift()

    // 1. get an array of every field
    const allFields = rows.map(row => ({
      id: slugify(row["Question"]),
      question: row["Question"],
      type: row["Input type"],
      required: row["Required?"] === "true",
      hint: row["Hints"],
      error: row["Custom error message"],
      prefill: row["Prefill from"],
      choices: qRow["Options"]
        .split(",")
        .filter(el => el)
        .map(choice => ({
          value: slugify(choice),
          label: choice,
        })),
      condition: {
        id: row["Shows up based on this question"],
        value: row["Shows up if question in column H has has value"],
      },
    }))

    fs.writeFileSync("./jobs/data.json", JSON.stringify(forms))
  } catch (e) {
    console.error(e)
  }
}

run()
