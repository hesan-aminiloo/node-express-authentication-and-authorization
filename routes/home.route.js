
const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home.controller');

router.post('/', home_controller.index);


module.exports = router;