const Users = require('../model/User');
const mongoose = require('mongoose');
const { infoLogger, errorLogger } = require('../utils/logger');

const getAllUsers = async uuid => {
    try {
        infoLogger(uuid, 'getAllUsers', 'Retrieving all users');
        const allUsers = await Users.find();
        infoLogger(uuid, 'getAllUsers', 'All users successfully retrieved');
        return allUsers;
    } catch (err) {
        errorLogger(uuid, 'getAllUsers', 'Error retrieving all users');
        return `Error fetching all users from db : ${err}`;
    }
}

const getUser = async (id, uuid) => {
    try {
        infoLogger(uuid, 'getUser', `Retrieving user with ID ${id}`);
        const user = await Users.findById(id);
        infoLogger(uuid, 'getUser', `User with ID ${id} successfully retrieved`);
        return user;
    } catch (e) {
        errorLogger(uuid, 'getUser', `Error retrieving user with ID ${id}`);
        return `Error fetching user from db with ID ${id}`;
    }
}

const createUser = async (user, uuid) => {
    try {
        infoLogger(uuid, 'createUser', `Attempting to create user ${user.name}`);
        user = Object.assign(user, {_id: new mongoose.Types.ObjectId()})
        const addedUser = new Users(user);
        infoLogger(uuid, 'createUser', `User ${user.name} successfully created`);
        return addedUser.save();
    } catch (e) {
        errorLogger(uuid, 'createUser', `Error creating user ${user.name}`);
        return `Error adding user to db`;
    }
}

const updateUser = async (id, user, uuid) => {
    try {
        infoLogger(uuid, 'updateUser', `Attempting to update user ${user.name}`);
        //find user first
        const foundUser = await Users.findById(id);
        //update document based on input
        for(let key in user) {
            foundUser[key] = user[key];
        }
        infoLogger(uuid, 'updateUser', `User ${user.name} successfully updated`);
        return foundUser.save();
    } catch (e) {
        errorLogger(uuid, 'updateUser', `Error updating user ${user.name}`);
        return `Error updating user with ID ${id}`;
    }
}

const removeUser = async (id, uuid) => {
    try {
        infoLogger(uuid, 'removeUser', `Attempting to remove user with ID ${id}`);
        const deletedUser = await Users.deleteOne({_id: id});
        infoLogger(uuid, 'removeUser', `User with ID ${id} successfully removed`);
        return deletedUser;
    } catch(e) {
        errorLogger(uuid, 'removeUser', `User with ID ${id} could not be removed`);
        return `Error removing user from db with ID ${id}`;
    }
}

const removeAllUsers =  async uuid => {
    try {
        infoLogger(uuid, 'removeUser', `Attempting to remove all users`);
        const deletedUser = await Users.deleteMany({});
        infoLogger(uuid, 'removeUser', `All users successfully removed`);
        return deletedUser;
    } catch(e) {
        errorLogger(uuid, 'removeUser', `User were not removed`)
        return `Error removing all users from db`;
    }
}

module.exports = {
    getUser, getAllUsers, createUser, updateUser, removeUser, removeAllUsers
};