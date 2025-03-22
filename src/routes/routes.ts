import express, { Router, Request, Response } from 'express';
import order from '../services/order_tasks';
import controller from '../controllers/controller';

const router: Router = express.Router();

router.post('/order', (req: Request, res: Response) => {
  if (controller.OrderTasks(req.body)) {
    const datas = order.OrderTasks(req.body);
    res.send(datas);
  } else {
    res.sendStatus(500).send('Error');
  }
});

export { router };
