const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .select('-__v')
        .then(dbUserdata => res.json(dbUserData))
        .catch(err => res.status(500).json(err))
    },

    // get single user by id
    getUserById({ params }, res) {
        // destructure params out of req since we don't need addtl data from req
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create user
    createUser({ body }, res) {
        // destructure body out of req
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    }
};

module.exports = userController;