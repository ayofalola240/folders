const express = require('express')
const paymentController = require('../controllers/paymentController')

const router = express.Router()

router.get('/:id', paymentController.getPaymentById)

router.post('/verify', paymentController.flwVerifyPayment)
router.post('/hook', paymentController.flwWebHook)



module.exports = router;