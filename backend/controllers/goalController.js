const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel'); // Gives us access to mongoose methods
const User = require('../models/userModel');
// @desc   Get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});

// @desc   Set goals
// @route  POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field'); // bad request status
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id // Goal is now associated with this user
    })

    res.status(200).json(goal)
});


// @desc   Update goals
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id); // find goal based on id given in get request

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id); // we have access to this now because of the protect call

    // Check if user exists
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Ensure user matches goal 
    if(goal.user.toString() !== user.id) { // each goal has user associated, ensure same user
        res.status(401);
        throw new Error('User not authorized for this goal');
    }


    //Params: id = updated object, body = what we update with, 
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});    

    res.status(200).json(updatedGoal);                 
});

// @desc   Delete goals
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id); // we have access to this now because of the protect call

    // Check if user exists
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Ensure user matches goal 
    if(goal.user.toString() !== user.id) { // each goal has user associated, ensure same user
        res.status(401);
        throw new Error('User not authorized for this goal');
    }

    await goal.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}