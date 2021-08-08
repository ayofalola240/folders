const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')


const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgetPassword', authController.forgetPassword)
router.patch('/updatePassword', authController.updatePassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updateMe', authController.protect, userController.updateMe)
router.delete('/deleteMe', authController.protect, userController.deleteMe)

router
    .route('/')
    .get(authController.protect, userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin', 'business'), userController.deleteUser);

module.exports = router;