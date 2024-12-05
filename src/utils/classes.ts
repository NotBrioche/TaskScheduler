export class Task {
  name: string = "";
  timeToDo: number = 0;
  priority: number = 0;

  start?: Date | null = null;
  end?: Date | null = null;

  constructor(
    name: string,
    timeToDo: number,
    priority: number,
    start?: Date | null,
    end?: Date | null
  ) {
    this.name = name;
    this.timeToDo = timeToDo;
    this.priority = priority;
    this.start = start;
    this.end = end;
  }

  static ToDo(name: string, timeToDo: number, priority?: number) {
    if (priority == null) priority = 0;

    return new Task(name, timeToDo, priority, null, null);
  }

  static Having(name: string, start: string, end: string) {
    return new Task(name, 0, 0, new Date(start), new Date(end));
  }

  toString(): string {
    if (this.start != null && this.end != null)
      return `[Task]: ${this.name} ${this.timeToDo} ${
        this.priority
      } ${this.start.getTime()} ${this.end.getTime()}`;
    else
      return `[Task]: ${this.name} ${this.timeToDo} ${this.priority} ${this.start} ${this.end}`;
  }
}
