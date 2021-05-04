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

    const forms = rows.map(row => ({
      id: slugify(qRow["Question"]),
      question: qRow["Question"],
      type: qRow["Input type"],
      required: qRow["Required?"] === "true",
      hint: qRow["Hints"],
      error: qRow["Custom error message"],
      choices: qRow["Options"]
        .split(",")
        .filter(el => el)
        .map(choice => ({
          value: slugify(choice),
          label: choice,
        })),
    }))

    fs.writeFileSync("./jobs/data.json", JSON.stringify(forms))
  } catch (e) {
    console.error(e)
  }
}

run()
