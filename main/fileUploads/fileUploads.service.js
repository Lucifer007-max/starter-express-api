const db = require('_helpers/db');

module.exports ={
    getAll,
    getById
}


async function getAll(){
    let data = await db.G2SfileUploads.findAll()
    let res = {rows:data }
    return res;
}
async function getById(id){
    return await getList(id);
}

async function getList(id){
    const list = await db.G2SfileUploads.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}
// getFile()
