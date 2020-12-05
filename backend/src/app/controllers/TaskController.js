import * as Yup from 'yup';

import Task from '../model/task';

class TaskController {
  async index(req, res) {
    const tasks = await Task.findAll();
  
    return res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      date: Yup.date().required(),
      time: Yup.date().required(),
      minutes_duration: Yup.number().min(5),
      remember_minutes_before: Yup.number().positive()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const task = await Task.create(req.body);

    return res.json(task);
  }

  async update(req, res) {
    const { id } = req.params;
    if (! await Yup.number().positive().isValid(id)) {
      return res.status(400).json({ error: "Id inválido."});
    }

    const taskToUpdate = await Task.findByPk(id);

    if (!taskToUpdate) {
      return res.status(400).json({ error: "Tarefa não existe na base de dados."});
    }

    const schema = Yup.object().shape({
      description: Yup.string().required(),
      date: Yup.date().required(),
      time: Yup.date().required(),
      minutes_duration: Yup.number().min(5),
      remember_minutes_before: Yup.number().positive()
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const task = await taskToUpdate.update(req.body);

    return res.json(task);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (! await Yup.number().positive().isValid(id)) {
      return res.status(400).json({ error: "Id inválido."});
    }

    const taskToDelete = await Task.findByPk(id);
    if (!taskToDelete) {
      return res.status(400).json({ error: "Tarefa não existe na base de dados."});
    }

    await taskToDelete.destroy();

    return res.json({});
  }
}

export default new TaskController();