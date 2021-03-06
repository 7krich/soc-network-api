const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    removeFriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// add friend
router
  .route('/:id/friends/:friendsId')
  .post(newFriend)
  .delete(removeFriend);

module.exports = router;