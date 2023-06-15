const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const adminService = require('./admin.service');

//routes
router.post('/role' , roleSchema , roleCreate  )
router.post('/faq' , faqSchema , faqCreate  )
router.get('/faqGet' ,  faqGet  )

router.post('/cardCreate' , cardSchema , cardCreate  )
router.get('/cardGet' ,  cardGet  )
router.get( '/adminprofile' , authorizeAdmin() , AdminGetById)

router.put('/createLogo' , logoSchema , logoCreate  )
router.get('/logoGet' ,  logoGet  )
module.exports = router;

function logoSchema(req, res, next) {
    const schema = Joi.object({
        logoImage: Joi.any()
    });
    validateRequest(req, next, schema);
}

function logoCreate(req, res, next) {
    adminService.updateLogo(req.params.id, req.body)
        .then(() => res.json({ message: 'Logo Added Sucessfull' }))
        .catch(next);
}

function logoGet(req , res, next) {
    adminService.logoGet(req.params.role)
    .then(lists => res.json(lists))
    .catch(next)
}

function roleSchema(req, res, next) {
    const schema = Joi.object({
        roleName: Joi.any()
    });
    validateRequest(req, next, schema);
}

function roleCreate(req, res, next) {
    adminService.rolecreate(req.body)
        .then(() => res.json({ message: 'Role Added Sucessfull' }))
        .catch(next);
}



function faqSchema(req, res, next) {
    const schema = Joi.object({
        faqTitle: Joi.any(),
        faqDescription: Joi.any()
    });
    validateRequest(req, next, schema);
}

function faqCreate(req, res, next) {
    adminService.faqCreate(req.body)
        .then(() => res.json({ message: 'FAQ Added Successfully' }))
        .catch(next);
}


function cardSchema(req, res, next) {
    const schema = Joi.object({
        cardTitle: Joi.any(),
        cardDescription: Joi.any()
    });
    validateRequest(req, next, schema);
}

function cardCreate(req, res, next) {
    adminService.cardCreate(req.body)
        .then(() => res.json({ message: 'Cards Added Successfully' }))
        .catch(next);
}


function cardGet (req , res, next) {
    adminService.cardGet(req.params.role)
    .then(lists => res.json(lists))
    .catch(next)
}

function faqGet (req , res, next) {
    adminService.faqGet(req.params.role)
    .then(lists => res.json(lists))
    .catch(next)
}








function AdminGetById (req , res, next) {
    adminService.adminGetById(req.params.role)
    .then(lists => res.json(lists))
    .catch(next)
}