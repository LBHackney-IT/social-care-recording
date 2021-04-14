import { useCallback } from "react"
import s from "../styles/TaskList.module.scss"
import { groupByTheme } from "../lib/helpers"
import { Form } from "../config/forms.types"

interface Props {
  form: Form
}

const TaskList = ({ form }: Props) => {
  const groupByThemeCb = useCallback(groupByTheme, [form])

  const themes = groupByThemeCb(form)
  return (
    <ol className={s.taskList}>
      {themes.map(theme => (
        <li key={theme.name}>
          {theme.name}
          <ol>
            {theme.steps.map(step => (
              <li key={step.id}>{step.name}</li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default TaskList
