const db = require("../models");
const Todo = db.todo;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.gender || !req.body.mobile) {
      res.status(400).send({
        message: "firstname.lastname,email,gender,mobile can not be empty!"
      });
      return;
    }
  
    // Create a Todo List
    const todo_req = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      gender: req.body.gender,
      mobile: req.body.mobile,
      is_deleted: req.body.is_deleted ? req.body.is_deleted : 0
    };
  
    // Save Tutorial in the database
    Todo.create(todo_req)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Todo."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Todo.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Todo.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Todo.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Todo.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Todo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Todo.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllDeleted = (req, res) => {
    Todo.findAll({ where: { is_deleted: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };