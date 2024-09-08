const router = require('express').Router();
const {
    getThoughts,
    postThought,
    getOneThought,
    putThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//get all thoughts, post thought
router.route('/').get(getThoughts).post(postThought)

//get a thought, put a thought, delete a thought
router.route('/:thoughtId').get(getOneThought).put(putThought).delete(deleteThought)

//post a reaction (for clarity: thoughtId/reaction)
router.route('/:thoughtId/reactions').post(postReaction)

//delete a reaction (for clarity: thoughtId/reaction/reactionId)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;