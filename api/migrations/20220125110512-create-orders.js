'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      UserId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      AddressId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Addresses',
          key: 'id',
        }
      },
      PaymentId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Payments',
          key: 'id',
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "pending"
      },
      paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
      },
      paymentAt: {
        type: Sequelize.DATE
      },
      shippingAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Orders');
  }
};
