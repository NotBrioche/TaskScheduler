import json from "../../tests/tasks.json";

import { Task } from "../utils/classes";

const havings: Array<Task> = [];
const todos: Array<Task> = [];
let range: number = 0;

json.tasks.forEach((v) => {
  if (v.name.trim() != "") {
    if (v.start != null && v.end != null) {
      havings.push(Task.Having(v.name, v.start, v.end));
    } else if (v.time_to_do != 0) {
      todos.push(Task.ToDo(v.name, v.time_to_do, v.priority));
    }
  }
});

if (json.range.start != null && json.range.end != null) {
  if (json.range.start == json.range.end) {
    // 86400 -> 60 * 60 * 24 (seconds in a day)
    range = 86400;
  } else {
    range =
      new Date(json.range.end).getTime() - new Date(json.range.start).getTime();
  }
}

export const tasks: Array<Task> = todos;
export const schedules: Array<Task> = havings;
export const time: number = range;
export const start: Date = new Date(json.range.start);
export const end: Date = new Date(json.range.end);
