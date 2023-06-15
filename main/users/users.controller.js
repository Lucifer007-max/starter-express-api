const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.delete('/remove/notify/:id'  , removeNotify)
router.post('/authenticateAdmin', authenticateSchema, authenticateAdmin);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/', getAll);
router.get('/allusers', getAlluserCount);
router.get('/allblog', getAllblogCount);
router.get('/allcategory', getAllcategoryCount);
router.get('/allcard', getAllcardCount);
router.get('/allfaq', getAllfaqCount);
router.get('/allfeedback', getAllfeedbackCount);



module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function authenticateAdmin(req, res, next) {
    userService.authenticateAdmin(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    req.body.role = "user";
    // req.body.password = makeid();
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role:Joi.string(),
        email:Joi.any().required(),
    });
    validateRequest(req, next, schema);
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    // return text;
    return "123456";
}

function register(req, res, next) {
    userService.create(req.body)
    // userService.create(req.body , req.params.id)
    .then((data) => res.json(data))
    .catch(next);
}
  
function getAll(req, res, next) {
    userService.getAll(req.query.page,req.query.limit,req.query.approved)
        .then(users => res.json(users))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
  
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}

function removeNotify(req, res, next) {
    userService.removeNotify(req.params.id)
    .then(() => res.json({msg : 'Marked as read'}))
    .catch(next)
}

function getAlluserCount(req, res, next) {
    userService.getAlluserCount()
        .then((data) => res.json(data))
        .catch(next)
}
function getAllblogCount(req, res, next) {
    userService.getAllblogCount()
        .then((data) => res.json(data))
        .catch(next)
}
function getAllcategoryCount(req, res, next) {
    userService.getAllcategoryCount()
        .then((data) => res.json(data))
        .catch(next)
}
function getAllcardCount(req, res, next) {
    userService.getAllcardCount()
        .then((data) => res.json(data))
        .catch(next)
}
function getAllfaqCount(req, res, next) {
    userService.getAllfaqCount()
        .then((data) => res.json(data))
        .catch(next)
}
function getAllfeedbackCount(req, res, next) {
    userService.getAllfeedbackCount()
        .then((data) => res.json(data))
        .catch(next)
}
