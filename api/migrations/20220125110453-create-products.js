'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productImage: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      desc: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      sold: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};