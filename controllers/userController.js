const _ = require('lodash');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
})

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        user
    });
})
exports.createUser = catchAsync(async (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be defined!'
    });

})

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be defined!'
    });
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is yet to be defined!'
    });
}
// Allow currently login user to update their user
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user posts password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }
    // 2) Filtered out unwanted fileds names that are not allowed to be updated
    const filteredBody = _.pick(req.body, ['fullName', 'email', "phone"])

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: 'success',
        data: null
    })
})