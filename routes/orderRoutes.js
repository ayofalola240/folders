const express = require('express')
const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController')


const router = express.Router()

router
    .route('/')
    .post(authController.protect, orderController.orderTruck)

router.route('/:id').get(authController.protect, orderController.getOrderById)

module.exports = router;