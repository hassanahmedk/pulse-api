const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const getAllUsers = asyncHandler(async(req,res)=> {
    const loggedInUserId = req.user.id;
    const allUsers = await User.find({ _id : { $ne : loggedInUserId}})
    res.status(200).send(allUsers)
})

module.exports = {getAllUsers}