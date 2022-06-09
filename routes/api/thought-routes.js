const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought
  } = require('../../controllers/thought-controllers');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
//router
//   .route('/:id')
//   .get(getUserById)
//   .put(updateUser)
//   .delete(deleteUser);

// add/remove friend
// router
//   .route('/:id/friends/:friendId')
//   .put(newFriend)
//   .put(removeFriend);

module.exports = router;