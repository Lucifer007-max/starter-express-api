const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');


module.exports ={
    rolecreate,
    faqCreate,
    faqGet,
    cardCreate,
    cardGet,
    adminGetById,
    logoCreate,
    logoGet
};
 
async function logoCreate(params) {
    await db.logo.create(params);
}

async function rolecreate(params) {
    await db.admin.create(params);
}
async function faqCreate(params) {
    await db.faq.create(params);
}
async function cardCreate(params) {
    await db.cards.create(params);
}
async function cardGet(){
    // const data = await db.sequelize.query('select * from Users where role = "admin"', {
    //     nest: true,
    //     type: QueryTypes.SELECT
    // });
    const data  = await db.cards.findAll()
    if (!data) throw 'No record found';
    return data;
}

async function logoGet(){
    const data = await db.sequelize.query('SELECT l.*, fu.filePath FROM logos AS l LEFT JOIN fileuploads AS fu ON l.logoImage = fu.id ', {
        nest: true,
        type: QueryTypes.SELECT
    });
    // const data  = await db.logo.findAll()
    if (!data) throw 'No record found';
    return data;
}
async function faqGet(){
    // const data = await db.sequelize.query('select * from Users where role = "admin"', {
    //     nest: true,
    //     type: QueryTypes.SELECT
    // });
    const data  = await db.faq.findAll()
    if (!data) throw 'No record found';
    return data;
}
async function adminGetById(id){
    return await getProfileId(id);
}

async function getProfileId(){
    const data = await db.sequelize.query('select * from Users where role = "admin"', {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!data) throw 'No record found';
    return data;
}