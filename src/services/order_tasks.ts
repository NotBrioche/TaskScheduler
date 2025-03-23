const convert = require('./json_to_data');
import { Data, Task } from '../utils/classes';

const OrderTasks = (json: Data) => {
  const tasks: Array<Task> = convert.JsonToData(json);
  const start: Date = new Date(convert.start(json));

  const todos: Array<Task> = [];
  const schedules: Array<Task> = [];

  tasks.forEach((e: Task) => {
    if (e.start == null && e.end == null) {
      todos.push(e);
    } else {
      schedules.push(e);
    }
  });

  let passed = 0;

  const ordered: Array<Task> = [];

  todos.sort((a: Task, b: Task) => {
    return b.priority - a.priority;
  });

  schedules.sort((a: Task, b: Task) => {
    return (
      (a.start ?? new Date().getTime()) - (b.start ?? new Date().getTime())
    );
  });

  const schedulesPassed: Array<any> = [];
  todos.forEach((t) => {
    schedules.forEach((s) => {
      if (s.start == null || s.end == null) return;
      const time = (s.end - s.start) / 1000;
      s.timeToDo = time / 60;

      if (
        start.getTime() / 1000 + t.timeToDo * 60 + passed >= s.start / 1000 &&
        start.getTime() / 1000 + t.timeToDo * 60 + passed <= s.end / 1000
      ) {
        passed += time;

        ordered.push(s);
        schedulesPassed.push(s);
        return;
      }
    });
    ordered.push(t);
    passed += t.timeToDo * 60;
  });

  if (
    schedules.length > 0 &&
    schedules[0].start != null &&
    start.getTime() / 1000 + todos[todos.length - 1].timeToDo * 60 + passed <
      schedules[0].start
  ) {
    for (let i = 0; i < schedules.length; i++) {
      if (!schedulesPassed.includes(schedules[i])) ordered.push(schedules[i]);
    }
  }

  passed = 0;
  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i].start == null) {
      ordered[i].start = new Date(start.getTime() + passed * 1000).getTime();
      ordered[i].end = new Date(
        start.getTime() + passed * 1000 + ordered[i].timeToDo * 60 * 1000
      ).getTime();
    }

    passed += ordered[i].timeToDo * 60;
    if (i > 0) passed += (ordered[i].start! - ordered[i - 1].end!) / 1000;
  }

  return ordered;
};

export = { OrderTasks };
