const express = require('express');
const router = express.Router();
const { getAll, getOne, create, update, remove } = require('../controllers/workouts');
const requireAuth = require('../middleware/requireAuth');


// require auth for all workout routes
router.use(requireAuth)

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
