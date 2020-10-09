module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      is_deleted: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Todo;
  };