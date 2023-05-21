const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .post('/', userController.createUser)
  .get('/:id', userController.getUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
