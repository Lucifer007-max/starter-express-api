const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const feedbackService = require('./feedback.service');


router.post('/feedbackPost' , feedbackSchema , feedbackCreate  )
router.get('/feedbackGet' ,  feedbackGet  )

module.exports = router;


function feedbackSchema(req, res, next) {
    const schema = Joi.object({
        fullName: Joi.any(),
        Message: Joi.any(),
        Reference: Joi.any(),
        Email: Joi.any(),
    });
    validateRequest(req, next, schema);
}


function feedbackCreate(req, res, next) {
    feedbackService.feedbackCreate(req.body)
        .then(() => res.json({ message: 'Thanks For Your Feedback We Will Update You Soon' }))
        .catch(next);
}


function feedbackGet(req, res, next){
    feedbackService.feedbackGet()
        .then((data) => res.json(data) )
        .catch(next)
}