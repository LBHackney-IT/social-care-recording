const config: Config = {
  /** How many milliseconds must have passed before a new revision of a form is saved?  */
  revisionInterval: 1000 * 60 * 5,
}

interface Config {
  revisionInterval: number
}

export default config
