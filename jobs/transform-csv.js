const csv = require("csvtojson")
const rawSlugify = require("slugify")
const fs = require("fs")

const slugify = string => rawSlugify(string, { lower: true })

// take a flat csv and turn it into the json format we need for our forms config
const run = async () => {
  try {
    const rows = await csv().fromFile("./jobs/data.csv")
    // 1. remove example row from data
    rows.shift()

    // 2. get an array of every field
    const allFields = rows.map(row => ({
      id: slugify(row["Question"]).replace(".", ")"),
      question: row["Question"],
      type: row["Input type"],
      required: row["Required?"] === "true",
      hint: row["Hints"],
      error: row["Custom error message"],
      prefill: row["Prefill from"],
      choices: row["Options"]
        .split(",")
        .filter(el => el)
        .map(choice => ({
          value: slugify(choice),
          label: choice.replace(".", ")"),
        })),
      condition: {
        id: row["Shows up based on this question"],
        value: row["Shows up if question in column H has has value"],
      },
      // use these in the next step
      step: row["Topic of questions (Step)"],
      theme: row["Header (Theme)"],
      stepDescription:
        row["More detail about topic of questions (Step description)"],
    }))

    // 3. group the fields by step
    const allSteps = allFields.reduce((steps, field) => {
      const { step, theme, stepDescription } = field
      const existingStep = steps.find(step2 => step2.name === step)
      if (existingStep) {
        existingStep.fields.push(field)
      } else {
        steps.push({
          id: slugify(step),
          name: step,
          theme: theme,
          stepDescription: stepDescription,
          fields: [field],
        })
      }
      return steps
    }, [])

    // 4. wrap steps in the form
    const form = {
      id: slugify(rows[0]["Form name"]),
      name: rows[0]["Form name"],
      steps: allSteps,
    }

    fs.writeFileSync("./jobs/output.json", JSON.stringify(form))
  } catch (e) {
    console.error(e)
  }
}

run()
