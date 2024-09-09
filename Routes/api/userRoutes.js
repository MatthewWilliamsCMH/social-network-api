const router=require('express').Router();
const {
    getUsers,
    postUser,
    getOneUser,
    putUser,
    deleteUser,
    postFriend,
    deleteFriend
} = require('../../controllers/userController');

//get all users, post a user
router.route('/').get(getUsers).post(postUser) //this defines two methods on the same route path. In other words, GET and POST users will both go to "/" but have different endpoints.

//get a user, put a user, delete a user
router.route('/:userId').get(getOneUser).put(putUser).delete(deleteUser) //three endpoints on one http route path

//post and delete a friend
router.route('/:userId/friends/:friendId').post(postFriend).delete(deleteFriend);

module.exports = router;