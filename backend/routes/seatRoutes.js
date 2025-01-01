const express = require('express');
const seatController = require('../controllers/seatController');

const router = express.Router();

router.post('/book', seatController.bookSeats);
router.get('/', seatController.getAllSeats);
router.post('/reset', seatController.resetSeats);

module.exports = router;
