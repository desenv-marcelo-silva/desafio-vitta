import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Task from '../app/model/task';

const models = [Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();