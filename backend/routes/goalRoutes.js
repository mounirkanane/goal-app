const express = require('express'); // common JS syntax
const router = express.Router();
const { getGoals, updateGoal, setGoal, deleteGoal} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect,getGoals).post(protect,setGoal);

router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal);

module.exports = router;