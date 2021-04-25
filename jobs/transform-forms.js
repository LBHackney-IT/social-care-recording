const csv = require("csvtojson")
const rawSlugify = require("slugify")
const fs = require("fs")

const slugify = string => rawSlugify(string, { lower: true })

const mapIfUnique = (rawData, processedKey, rawKey, filterFunc, cb) =>
  rawData.filter(filterFunc).reduce((accumulator, formRow) => {
    if (accumulator.find(el => el[processedKey] === formRow[rawKey])) {
      return accumulator
    } else {
      return cb(accumulator, formRow)
    }
  }, [])

// take a flat csv and turn it into the json format we need for our forms config
const run = async () => {
  try {
    const rawData = await csv().fromFile("./jobs/data.csv")
    // remove example row from data
    rawData.shift()

    const forms = mapIfUnique(
      rawData,
      "name",
      "Form name",
      el => true,
      (accumulator, formRow) =>
        accumulator.concat({
          id: slugify(formRow["Form name"]),
          name: formRow["Form name"],

          steps: mapIfUnique(
            rawData,
            "name",
            "Topic of questions (Step)",
            stepRow => stepRow["Form name"] === formRow["Form name"],
            (accumulator, stepRow) =>
              accumulator.concat({
                id: slugify(stepRow["Topic of questions (Step)"]),
                name: stepRow["Topic of questions (Step)"],
                theme: stepRow["Header (Theme)"],

                fields: mapIfUnique(
                  rawData,
                  "question",
                  "Question",
                  qRow =>
                    qRow["Topic of questions (Step)"] ===
                    stepRow["Topic of questions (Step)"],
                  (accumulator, qRow) =>
                    accumulator.concat({
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
                      // TODO: handle these
                      // prefill
                      // className
                      // condition
                    })
                ),
              })
          ),
        })
    )

    fs.writeFileSync("./jobs/data.json", JSON.stringify(forms))
  } catch (e) {
    console.error(e)
  }
}

run()
