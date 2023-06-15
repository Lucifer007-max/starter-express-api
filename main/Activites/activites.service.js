const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');
module.exports = {
    Activitescreate,
    ActivitesgetAll,
    delete: Activites_delete,
    ActivitesgetById,
    Activitesupdate,
    ActiviteseventDel,

    ActiviteEventcreate,
    ActiviteeventgetAll,
    ActiviteeventgetAlladmin,
    ActiviteEventgetById,
    Eventupdate
    // Advancecoursedelete: Advancecourse_delete,
};

//-------------------AABQuality API's-----------------

async function Activitescreate(params) {
    await db.activiteslists.create(params);
}

async function ActivitesgetAll(){
    let data = await db.sequelize.query('SELECT Al.*,fu.filePath  FROM activiteslists AS Al LEFT JOIN fileuploads as fu on Al.banner = fu.id;' , {
        nest: true,
        type: QueryTypes.SELECT
    })
    let res = {
        rows:data,
    }
    return res;
}

async function Activites_delete(id){
    const list =  await ActivitesDelete(id);
    await list.destroy();
}

async function ActivitesDelete(id){
    const list = await db.activiteslists.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}


async function AABQualitygetList(id){
    const list = await db.sequelize.query('SELECT Al.*,fu.filePath  FROM activiteslists AS Al LEFT JOIN fileuploads as fu on Al.banner = fu.id;' , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;
}

async function ActivitesgetById(id){
    return await getListimg(id);
}

async function Activitesupdate(id , params){
    const lists = await getList(id);
    
    Object.assign( lists , params);
    await lists.save();
    
    return omitHash(lists.get()); 
}

async function getList(id){
    const list = await db.activiteslists.findByPk(id);
    
    if (!list) throw 'No record found';

    return list;
}

async function getListimg(id){
    // const list = await db.ActivitesLists.findByPk(id);
    let list = await db.sequelize.query('SELECT Al.*,fu.filePath  FROM activiteslists AS Al LEFT JOIN fileuploads as fu on Al.banner = fu.id Where Al.id =' + id , {
        nest: true,
        type: QueryTypes.SELECT
    })
    if (!list) throw 'No record found';
    return list;
}


// Events


// Events -----------------
async function ActiviteEventcreate(params) {
    await db.ActivitesEvents.create(params)
}
async function ActiviteeventgetAll(){
    const data = await db.sequelize.query('SELECT ae.* ,fu.filePath FROM activitesevents AS ae LEFT JOIN fileuploads as fu on ae.image  = fu.id', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = {rows:data}
    return res;
}
async function ActiviteeventgetAlladmin(){
    const data = await db.sequelize.query('SELECT ae.* ,fu.filePath FROM activitesevents AS ae LEFT JOIN fileuploads as fu on ae.image  = fu.id WHERE DATE(startDate) <= DATE(NOW()) AND DATE(endDate) >= DATE(NOW())', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = {rows:data}
    return res;
}

async function ActiviteEventgetById(id) {
    return await getEventId(id)
}

async function getEventId(id){
    const list = await db.sequelize.query(`SELECT ae.* ,fu.filePath FROM activitesevents AS ae left JOIN fileuploads as fu on ae.image  = fu.id  Where (ae.ActiviteName = ${id}) and  (DATE(startDate) <= DATE(NOW()) AND DATE(endDate) >= DATE(NOW()))` , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;
}

async function Eventupdate(id , params){
    const lists = await geteventsData(id)
    
    Object.assign( lists , params);
    await lists.save();
    
    return omitHash(lists.get()); 
}

async function ActiviteseventDel(id){
    const list =  await geteventsData(id);
    await list.destroy();
}

async function geteventsData(id){
    const list = await db.ActivitesEvents.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}

function omitHash(lists) {
    const { hash, ...userWithoutHash } = lists;
    return userWithoutHash; 
}
