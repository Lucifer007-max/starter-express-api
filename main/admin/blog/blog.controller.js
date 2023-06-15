const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const blogService = require('./blog.service');

router.post('/create/category' , categorySchema , categoryCreate)
router.get('/categorygetAll' , categoryGetAll  )

router.post('/createBlogs' , blogSchema , blogCreate  )
router.get( '/blogGetAll' ,  blogGetAll)
router.get( '/blogSingle/:id' ,  blogGetByID)

module.exports = router;



function categorySchema(req, res, next) {
    const schema = Joi.object({
        categoryName: Joi.any()
    });
    validateRequest(req, next, schema);
}

function categoryCreate(req, res, next) {
    blogService.categoryCreate(req.body)
        .then(() => res.json({ message: 'Category added sucessfully' }))
        .catch(next);
}


function categoryGetAll(req, res, next) {
    blogService.categoryGetAll(req.query.page,req.query.limit)
    .then(users => res.json(users))
    .catch(next);
}

function blogSchema(req, res, next) {
    const schema = Joi.object({
        categoryID: Joi.any(),
        blogDate: Joi.any(),
        blogTitle: Joi.string(),
        blogImage: Joi.any(),
        blogDescription: Joi.string(),
    });
    validateRequest(req, next, schema);
}
function blogCreate(req, res, next) {
    blogService.blogCreate(req.body)
        .then(() => res.json({ message: 'Blog added sucessfully' }))
        .catch(next);
}
function blogGetAll(req, res, next) {
    blogService.blogGetAll(req.query.page,req.query.limit)
    .then(users => res.json(users))
    .catch(next);
}
function blogGetByID(req, res, next) {
    blogService.blogGetByID(req.params.id)
    .then(users => res.json(users))
    .catch(next);
}