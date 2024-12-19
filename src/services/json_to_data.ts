import { Task } from "../utils/classes";

const start = (json: any) => {
  if (!("range" in json) || !("start" in json.range)) return new Date();
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

const JsonToData = (json: any) => {
  const elems: Array<Task> = [];

  json.tasks.forEach((t: any) => {
    if (t.name != null && t.name.trim() != "") {
      if (t.time_to_do != null) {
        elems.push(new Task(t.name, t.time_to_do, t.priority ?? 0, null, null));
      } else if (t.start != null && t.end != null) {
        const start: Date = new Date(t.start);
        const end: Date = new Date(t.end);
        elems.push(
          new Task(
            t.name,
            end.getTime() - start.getTime() / 1000 / 60,
            t.priority ?? 0,
            start,
            end
          )
        );
      }
    }
  });

  return elems;
};

module.exports = { JsonToData, start, range };
