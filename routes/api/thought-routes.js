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

// Set up GET /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:userId')


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// add reaction
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// remove reaction
 router
   .route('/:thoughtId/reactions/:reactionId')
   .delete(removeReaction);

module.exports = router;