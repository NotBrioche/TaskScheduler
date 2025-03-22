import { Data, Task } from '../utils/classes';

const OrderTasks = (datas: Data) => {
  let valid = true;
  if (datas.tasks == null || datas.tasks.length < 1) {
    valid = false;
    console.log('!valid : no tasks');
  }

  datas.tasks.forEach((t: Task) => {
    if (t.name == null) {
      console.log('!valid : name');
      valid = false;
    }

    if (t.timeToDo == null && (t.start == null || t.end == null)) {
      console.log('!valid : content not ok');
      valid = false;
    }
  });

  return valid;
};

export = { OrderTasks };
