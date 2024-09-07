//FROM THE README **`/api/thoughts`**
const router=require('express').router;
const {
    getThoughts,
    postThought,
    getOneThought,
    putThought,
    deleteThought
} = require('../../controllers/thoughtController');

//get all thoughts, create thought
router.route('./:userId/thoughts').get(getThoughts).post(postThought)

//get a thought, put a thought, delete a thought
router.route('./:userId/thoughts/:thoughtId').get(getOneThought).put(putThought).delete(deleteThought)

//post a reaction (for clarity: thoughtId/reaction)
route.router('./:thoughtId/reactions').post(postReaction)

//delete a reaction (for clarity: thoughtId/reaction/reactionId)
route.router('./:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;