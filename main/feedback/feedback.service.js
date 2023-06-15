const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');


module.exports ={
    feedbackCreate,
    feedbackGet
}

async function feedbackCreate(params) {
    await db.feedback.create(params);
}
async function feedbackGet(params) {
    const data =  db.feedback.findAll();
    let res = data;

    return res
}