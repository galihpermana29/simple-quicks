import { Dayjs } from "dayjs"

export interface TasksData {
  title: string
  remaining: string
  date: Dayjs | string | null
  text: string
  id: number | string
  finish: boolean
}

export type TaskI = TasksData[]

export const Tasks: TaskI = [
  {
    title: "Dinner with Friends",
    remaining: "2 Days Left",
    date: "12/12/2021",
    text: "lorem ipsum..",
    id: 1,
    finish: false,
  },
  {
    title: "Watch the Arsenal",
    remaining: "2 Days Left",
    date: "12/10/2021",
    text: "lorem ipsum..",
    id: 2,
    finish: false,
  },
]
