import { Data, Task } from '../utils/classes';

const start = (json: any) => {
  if (!('range' in json) || !('start' in json.range)) return new Date();
  else return new Date(json.range.start);
};

const range = (json: any) => {
  if (json.range.start != null && json.range.end != null) {
    if (json.range.start == json.range.end) {
      // 86400 -> 60 * 60 * 24 (seconds in a day)
      return 86400;
    } else {
      return (
        new Date(json.range.end).getTime() -
        new Date(json.range.start).getTime()
      );
    }
  }
};

const JsonToData = (json: Data) => {
  const elements: Array<Task> = [];

  json.tasks.forEach((t: Task) => {
    if (t.name != null && t.name.trim() != '') {
      if (t.timeToDo != null) {
        elements.push(
          new Task(t.name, t.timeToDo, t.priority ?? 0, null, null)
        );
      } else if (t.start != null && t.end != null) {
        const start: number = new Date(t.start).getTime();
        const end: number = new Date(t.end).getTime();
        elements.push(
          new Task(t.name, end - start / 1000 / 60, t.priority ?? 0, start, end)
        );
      }
    }
  });

  return elements;
};

export = { JsonToData, start, range };
