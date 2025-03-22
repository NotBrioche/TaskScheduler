export class Task {
  name: string;
  timeToDo: number;
  priority: number;

  start?: Date | null;
  end?: Date | null;

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

export class Range {
  private _start: string;
  private _end: string;

  get start(): Date {
    return new Date(this._start);
  }

  get end(): Date {
    return new Date(this._end);
  }

  constructor(start: string, end: string) {
    this._start = start;
    this._end = end;
  }
}

export class Data {
  tasks: Array<Task>;
  range: Range;

  constructor(tasks: Array<Task>, range: Range) {
    this.tasks = tasks;
    this.range = range;
  }
}
