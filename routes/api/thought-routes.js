const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controllers');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)

router
  .route('/:userId')
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)

// update/remove thoughts
router
  .route("/:userId/:thoughtId")
  .put(updateThought)
  .delete(removeThought);

// add thought
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// remove thought
 router
   .route('/:thoughtId/reactions/:reactionId')
   .put(removeReaction);

module.exports = router;