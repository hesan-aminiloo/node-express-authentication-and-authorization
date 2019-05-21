
const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/list', user_controller.listUsers);
router.get('/:id', user_controller.getUser);
router.put('/:id', user_controller.update);
router.delete('/:id', user_controller.delete);

module.exports = router;