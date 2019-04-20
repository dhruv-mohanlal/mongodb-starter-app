const userController = require('./userController');
const uuidv4 = require('uuid/v4');
const { infoLogger } = require('../utils/logger');

const requestHandler = async (req, res) => {
    const uuid = uuidv4();
    let response = '';
    infoLogger(uuid, 'requestHandler', `${req.method} API call made`);
    switch (req.method) {
        case 'GET':
            response = Object.keys(req.params).length === 0 ?
                await userController.getAllUsers(uuid) : await userController.getUser(req.params.id, uuid);
            break;
        case 'POST':
            response = await userController.createUser(req.body, uuid);
            break;
        case 'PATCH':
            response = await userController.updateUser(req.params.id, req.body, uuid);
            break;
        case 'DELETE':
            response = response = Object.keys(req.params).length === 0 ?
                await userController.removeAllUsers(uuid) : await userController.removeUser(req.params.id, uuid);
            break;
        default:
            break;
    }
    if (typeof response === "string") res.status(500);
    else {
        if (req.method === "POST") res.status(201);
        else res.status(200);
    }
    res.json(response);
}


module.exports = { requestHandler }