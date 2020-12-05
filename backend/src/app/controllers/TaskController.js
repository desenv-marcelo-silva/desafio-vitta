import Task from '../model/Task';

class TaskController {
  async index(req, res) {
    return res.json(req.body);
  }

  async store(req, res) {
    return res.json(req.body);
  }

  async update(req, res) {
    return res.json(req.body);
  }

  async delete(req, res) {
    return res.json(req.params);
  }
}

export default new TaskController();