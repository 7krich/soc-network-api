const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
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
    },

    // update User
    updateUser({ params, body }, res) {
        // find single docuemnt to update, update it, & return orig doc
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        // find document & delete it from db
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    newFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: {friends: params.friendId }}, { new: true, runValidators: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull : { friends: params.friendsId }})
        .then(dbUserData => res.json(dbUserData, (params.friendId, 'User')))
        .catch(err => res.json(err))
    }
};

module.exports = userController;