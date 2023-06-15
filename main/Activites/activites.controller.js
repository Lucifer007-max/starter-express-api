const express = require('express');
const router = express.Router();
const joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const authorize = require('_middleware/authorize')
const activitesService = require('./activites.service')



//routes Activites Events
router.post('/Activiteevent' , ActiviteEventSchema , ActiviteEventcreate)
router.get('/ActiviteeventAll' , ActiviteeventgetAll);
router.get('/ActiviteeventAlladmin' , ActiviteeventgetAlladmin);
router.get('/ActiviteeventGet/:id' ,  ActiviteEventgetById);
router.put('/Activiteeventupdate/:id',  updateActiviteeventSchema, Eventupdate)
router.delete ('/Activiteevendel/:id' ,   ActiviteseventDel )


//routes Activites
router.post('/create', authorizeAdmin(), ActivitesSchema, Activitescreate)
router.get('/' ,   ActivitesgetAll);
router.delete ('/:id' , authorizeAdmin() ,   Activites_delete )
router.get('/:id',  ActivitesgetById),
router.put('/:id', authorizeAdmin(), updateSchema, update)

module.exports = router;


//------Activites ----------------
function ActivitesSchema(req, res, next) {
    const schema = joi.object({
        banner: joi.any(),
        Title: joi.any(),
        Description: joi.any(),
    });
    validateRequest(req, next, schema);
}

function Activitescreate(req, res, next) {
    activitesService.Activitescreate(req.body)
        .then(() => res.json({ message: 'AAB-Quality Added Sucessfully' }))
        .catch(next);
}

function ActivitesgetAll(req, res, next) {
    activitesService.ActivitesgetAll(req.query.page, req.query.limit)
        .then(lists => res.json(lists))
        .catch(next);
}

function Activites_delete(req , res, next) {
    activitesService.delete(req.params.id)
    .then(() => res.json({message : 'Activites  Delete Sucessfully'}))
    .catch(next)
}

function ActivitesgetById(req , res, next){
    activitesService.ActivitesgetById(req.params.id)
     .then(list => res.json(list))
     .catch(next);
}

function updateSchema(req, res, next) {
    const schema = joi.object({
        banner: joi.number().empty(''),
        Title:joi.any().empty(''),
        Description: joi.any().empty(''),
    });
    validateRequest(req, next, schema)
}

function update(req, res, next) {
    activitesService.Activitesupdate(req.params.id, req.body)
        .then(lists => res.json(lists))
        .catch(next);
}



function ActiviteEventSchema(req, res, next) {
    const schema = joi.object({
        ActiviteName: joi.any(),
        content: joi.any(),
        image: joi.any(),
        ActiviteeventTitle: joi.any(),
        Activiteeventauthor: joi.any(),
        startDate: joi.any(),
        endDate: joi.any(),
        
    });
    validateRequest(req , next , schema);
}

function ActiviteEventcreate(req, res , next) {
    activitesService.ActiviteEventcreate(req.body)
    .then(() => res.json({message : 'Activites Event Added Sucessfully'}))
    .catch(next);
}

function  ActiviteeventgetAll(req, res, next) {
    activitesService.ActiviteeventgetAll(req.query.page, req.query.limit)
        .then(lists => res.json(lists))
        .catch(next);
}

function  ActiviteeventgetAlladmin(req, res, next) {
    activitesService.ActiviteeventgetAlladmin(req.query.page, req.query.limit)
        .then(lists => res.json(lists))
        .catch(next);
}

function ActiviteEventgetById (req, res, next) {
    activitesService.ActiviteEventgetById(req.params.id)
    .then(lists => res.json(lists))
    .catch(next)
}

function updateActiviteeventSchema(req, res, next) {
    const schema = joi.object({
        ActiviteName: joi.any(),
        content: joi.any(),
        image: joi.any(),
        ActiviteeventTitle: joi.any(),
        Activiteeventauthor: joi.any(),
        startDate: joi.any(),
        endDate: joi.any(),
    });
    validateRequest(req , next , schema);
}

function Eventupdate (req, res, next) {
    activitesService.Eventupdate(req.params.id, req.body)
    .then(()=> res.json({message : 'Activites Event Update Successfully'}))
    .catch(next);
}

function ActiviteseventDel(req , res, next) {
    activitesService.ActiviteseventDel(req.params.id)
    .then(() => res.json({message : 'Activites Event Delete Sucessfully'}))
    .catch(next)
}

