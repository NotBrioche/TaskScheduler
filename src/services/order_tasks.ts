import * as data from "./json_to_data";
import { Task } from "../utils/classes";

const tasks: Array<Task> = data.tasks;
const schedules: Array<Task> = data.schedules;
let passed = 0;

const elements: Array<Task> = [];

tasks.sort((a: Task, b: Task) => {
  return b.priority - a.priority;
});

schedules.sort((a: Task, b: Task) => {
  if (a.start == null || b.start == null) {
    a.start = new Date();
    b.start = new Date();
  }

  return a.start?.getTime() - b.start?.getTime();
});

tasks.forEach((t) => {
  schedules.forEach((s) => {
    if (s.start == null || s.end == null) return;
    const time = (s.end?.getTime() - s.start.getTime()) / 1000;
    s.timeToDo = time / 60;

    if (
      data.start.getTime() / 1000 + t.timeToDo * 60 + passed >=
      s.start.getTime() / 1000
    ) {
      // const differ = data.start.getTime() / 1000 + t.timeToDo * 60 + passed - s.start.getTime();
      passed += time;

      elements.push(s);
      return;
    }
  });
  elements.push(t);
  passed = t.timeToDo * 60;
});

if (
  schedules[0].start != null &&
  data.start.getTime() / 1000 + tasks[tasks.length - 1].timeToDo * 60 + passed <
    schedules[0].start?.getTime()
) {
  schedules.forEach((s) => {
    elements.push(s);
  });
}

passed = 0;

elements.forEach((e) => {
  if (e.start == null) {
    e.start = new Date(data.start.getTime() + passed * 1000);
    e.end = new Date(
      data.start.getTime() + passed * 1000 + e.timeToDo * 60 * 1000
    );
  }

  passed += e.timeToDo * 60;
  // console.log(e.toString());
  console.log(
    `[1] ${e.name} - ${
      e.timeToDo
    }min (${e.start?.toLocaleTimeString()} - ${e.end?.toLocaleTimeString()})`
  );
});
