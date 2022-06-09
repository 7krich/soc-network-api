const { Thought, User } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(500).json(err))
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({ body }, res) {
        Thought.create({ thoughtText: body.thoughtText, username: body.username })
        .then(({_id}) => User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } }, 
            { new: true }))
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
}

module.exports = thoughtController;