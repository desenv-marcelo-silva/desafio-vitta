import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        date: Sequelize.DATE,
        time: Sequelize.DATE,
        minutes_duration: Sequelize.INTEGER,
        remember_minutes_before: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Task;