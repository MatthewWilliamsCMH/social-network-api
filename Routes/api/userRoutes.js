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

//post a user
//I think this is covered above (".post(createUser)")

//update a user
//covered above?

//delete a user
//covered above?

//FROM THE README **`/api/users/:userId/friends/:friendId`**
//post and delete a friend from an existing user (for clarity: userId/friend/userId [friend])
//this is cross-reference; the friend must exist in users collection
router.route('/:userId/friends/:friendId').post(postFriend).delete(deleteFriend);

module.exports = router;