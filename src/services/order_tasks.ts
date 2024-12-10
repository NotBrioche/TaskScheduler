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
const schedulesPassed: Array<any> = [];
tasks.forEach((t) => {
  schedules.forEach((s) => {
    if (s.start == null || s.end == null) return;
    const time = (s.end?.getTime() - s.start.getTime()) / 1000;
    s.timeToDo = time / 60;

    if (
      data.start.getTime() / 1000 + t.timeToDo * 60 + passed >=
      s.start.getTime() / 1000 && data.start.getTime() / 1000 + t.timeToDo * 60 + passed <= s.end.getTime() / 1000
    ) {
      passed += time;

      elements.push(s);
      schedulesPassed.push(s);
      return;
    }
  });
  elements.push(t);
  passed += t.timeToDo * 60;
});

if (
  schedules[0].start != null &&
  data.start.getTime() / 1000 + tasks[tasks.length - 1].timeToDo * 60 + passed <
    schedules[0].start?.getTime()
) {
  for (let i = 0; i < schedules.length; i++) {
    if (!schedulesPassed.includes(schedules[i]))
      elements.push(schedules[i])
  }
}

passed = 0;

console.log(`--- ${data.start.toDateString()} ---`);


for (let i = 0; i < elements.length; i++) {
  if (elements[i].start == null) {
    elements[i].start = new Date(data.start.getTime() + passed * 1000);
    elements[i].end = new Date(
      data.start.getTime() + passed * 1000 + elements[i].timeToDo * 60 * 1000
    );
  }

  passed += elements[i].timeToDo * 60;
  if (i > 0)
    passed += (elements[i].start!.getTime() - elements[i - 1].end!.getTime()) / 1000

  console.log(
    `[${i + 1}] ${elements[i].name} - ${
      elements[i].timeToDo
    }min (${elements[i].start?.toLocaleTimeString()} - ${elements[i].end?.toLocaleTimeString()})`
  );
};
