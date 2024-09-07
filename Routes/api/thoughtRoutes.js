//FROM THE README **`/api/thoughts`**
const router=require('express').router;
const {
    getThoughts,
    getOneThought,
    postThought,
    putThought,
    deleteThought
} = require('../../controllers/thoughtController');

//get all thoughts, create thought
router.route('./:_id/thoughts').get(getThoughts).post(postThought)

//get a thought, put a thought, delete a thought
router.route('./:_id/thoughts/:_id').get(getOneThought).put(putThought).delete(deleteThought)

//post a reaction (for clarity: thoughtId/reaction)
route.router('./:_id/reactions').post(postReaction)

//delete a reaction (for clarity: thoughtId/reaction/reactionId)
route.router('./:_id/reactions/:id').delete(deleteReaction)

module.exports = router;