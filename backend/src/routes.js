import { Router } from 'express';

import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.delete('/tasks/:id', TaskController.delete);
routes.put('/tasks/:id', TaskController.update);

export default routes;