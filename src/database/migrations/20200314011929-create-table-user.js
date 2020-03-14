'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNUll: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNUll: false,
        unique: true,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNUll: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');

  }
};
