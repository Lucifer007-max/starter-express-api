const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');


module.exports ={
    categoryCreate,
    categoryGetAll,
    blogCreate,
    blogGetAll,
    blogGetByID
};
 

async function categoryCreate(params) {
    if(!params.categoryName)
        throw `Category name can't be empty`

    await db.blogcategory.create(params);
}
async function categoryGetAll(){
    let data = await db.blogcategory.findAll();
    let res = {rows:data};
    return res;
}

async function blogCreate(params) {
    if(!params.categoryID )
        throw `Blog ID can't be empty`

    if(!params.blogTitle || params.blogTitle  == null)
        throw `Blog Title can't be empty`

    if(!params.blogDescription || params.blogDescription  == null )
        throw `Blog Description can't be empty`

    await db.blog.create(params);
}


async function blogGetAll(){
    const data = await db.sequelize.query('SELECT b.*, fu.filePath, bc.categoryName FROM blogs AS b LEFT JOIN fileuploads AS fu ON b.blogImage = fu.id LEFT JOIN blogcategories AS bc ON b.categoryID = bc.id;' , {
        nest: true,
        type: QueryTypes.SELECT
    });
    // let data = await db.blog.findAll();
    if (!data) throw 'No record found';
    let res = {rows:data};
    return res;
}



async function blogGetByID(id){
    // console.log(id)
    // const list = await db.blog.findByPk(id);
    const list = await db.sequelize.query('SELECT b.*, fu.filePath, bc.categoryName FROM blogs AS b LEFT JOIN fileuploads AS fu ON b.blogImage = fu.id LEFT JOIN blogcategories AS bc ON b.categoryID = bc.id WHERE b.id = ' + id , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list)
        throw 'No record found';
        
    return list;
}