export class Task {
  name: string;
  timeToDo: number;
  priority: number;

  start?: number | null;
  end?: number | null;

  constructor(
    name: string,
    timeToDo: number,
    priority: number,
    start?: number | null,
    end?: number | null
  ) {
    this.name = name;
    this.timeToDo = timeToDo;
    this.priority = priority;
    this.start = start;
    this.end = end;
  }

  static ToDo(name: string, timeToDo: number, priority?: number) {
    return new Task(name, timeToDo, priority ?? 0);
  }

  static Appointment(name: string, start: number, end: number) {
    return new Task(
      name,
      0,
      0,
      new Date(start).getTime(),
      new Date(end).getTime()
    );
  }

  toString(): string {
    return `[Task]: ${this.name} ${this.timeToDo} ${this.priority} ${this.start} ${this.end}`;
  }
}

export class Range {
  private _start: number;
  private _end: number;

  get start(): Date {
    return new Date(this._start);
  }

  get end(): Date {
    return new Date(this._end);
  }

  constructor(start: number, end: number) {
    this._start = start;
    this._end = end;
  }

  static fromDateString(start: string, end: string) {
    return new Range(new Date(start).getTime(), new Date(end).getTime());
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
