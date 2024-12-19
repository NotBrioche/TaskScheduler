import { Request, Response } from "express";
import { Task } from "../utils/classes";
const order = require("../services/order_tasks");

const OrderTasks = (req: Request, res: Response) => {
  const json = req.body;
  let datas = null;

  let valid = true;
  if (json.tasks == null) {
    valid = false;
    console.log("!valid : no tasks");
  }

  json.tasks.forEach((t: any) => {
    if (t.name == null) {
      console.log("!valid : name");
      valid = false;
    }

    if (t.time_to_do == null && (t.start == null || t.end == null)) {
      console.log("!valid : content not ok");
      valid = false;
    }
  });

  if (valid) datas = order.OrderTasks(req.body);
  // res.status(200).append("Hello");
  res.send(datas);
};

module.exports = OrderTasks;
