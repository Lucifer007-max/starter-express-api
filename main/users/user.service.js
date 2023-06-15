const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');

module.exports = {
    authenticate,
    authenticateAdmin,
    approveUser,
    approveMail,
    
    getAll,
    getById,
    create,
    update,
    delete: _delete,


    getAlluserCount,
    getAllblogCount,
    getAllcategoryCount,
    getAllcardCount,
    getAllfaqCount,
    getAllfeedbackCount

};




async function  getAlluserCount() {
    const user = await db.sequelize.query('select count(*) from users', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllblogCount() {
    const user = await db.sequelize.query('select count(*) from blogs', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllcategoryCount() {
    const user = await db.sequelize.query('select count(*) from blogcategories', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllcardCount() {
    const user = await db.sequelize.query('select count(*) from cards', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllfaqCount() {
    const user = await db.sequelize.query('select count(*) from faqs', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllfeedbackCount() {
    const user = await db.sequelize.query('select count(*) from feedbacks', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function  getAllblogCount() {
    const user = await db.sequelize.query('select count(*) from blogs', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = user
    return res;
}
async function authenticateAdmin({ email, password }) {
    const user = await db.users.scope('withHash').findOne({ where: { email:email,role:['admin'] }});

    if (!user)
        throw 'Username name is incorrect';

    // console.log(password , user.get().hash)
    if(password != user.hash)
        throw 'Password is incorrect';


    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token , 'message' : 'Login Successful'};
}

async function authenticate({ email, password }) {
    const user = await db.users.findOne({ where: { email:email,role:'user' } });

    if (!user)
        throw 'Username name is incorrect';

    // console.log(password , user.get().hash)
    if(password != user.hash)
        throw 'Password is incorrect';


    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token , message: 'Login Successful' };
}

async function getAll() {


    const list = await db.users.findAll({where: {role :'user'}})

    const data = list
    return data
    // page = parseInt(page);
    // limit = parseInt(limit);
    // let offset = (page-1)*limit;
    // var filterBy = {
    //     role:"user"
    // };
    // var approved = {
    //     approved : 0
    // };
    // if(approved != ""){
    //     filterBy['approved'] = approved;
    // }

    // let count = await db.users.count({ where: filterBy });
    
    // const users = await db.sequelize.query("select us.*, cl.countryTitle from users as us inner join countrylists as cl on us.country_id=cl.id where role='user' and approved= '0' and paymentStatus= '0' limit "+offset+","+limit  , {
    //     nest: true,
    //     type: QueryTypes.SELECT
    // });


    // let total_pages = parseInt((count/limit).toFixed());
    
    // let new_users = await db.users.count({ where: filterBy , approved })
    // let res = {
    //     pagination:{
    //         total_count:count,
    //         total_pages:total_pages,
    //         current_page:page,
    //         limit:limit
    //     },
    //     rows:users,new_users
    // };
    
    // let data = new_users[0];
    
    // let award  = await db.fileUploads.findOne({ where: {id: data.award_honor_id } }); 
    // let usser = data.get();
    // if('filePath' in usser){
    //     usser['award'] = award.filePath;
    // }
    // else{
    //     usser['image'] = "";

    // }

    // let publications  = await db.fileUploads.findOne({ where: {id: data.publication_id } }); 
    // data['publicationsfile'] = publications.get().filePath;

    // let Achievement   = await db.fileUploads.findOne({ where: {id: data.achievement_in_transfusion_medicine } }); 
    // data['Achievementfile'] = Achievement.get().filePath;

    // let ScientificAssociationTransfusion    = await db.fileUploads.findOne({ where: {id: data.membership_of_association } }); 
    // data['ScientificAssociationTransfusionfile'] = ScientificAssociationTransfusion.get().filePath;

    return res;
}


async function getById(id) {
    return await getUser(id);
}



async function create(params) {
    // validate
    if (await db.users.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await params.password;
    }

   
    // //Create user
    let new_user = await db.users.create(params);


    
    

    // let res = [{new_user} , {message:"Registration successful"}] ;
    return  {message:"Registration successful"};
}




async function rolecreate(params) {
    // validate
    if (await db.users.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }
    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }
    //unique id
    let qry = "SELECT max(unique_id) as unique_id  FROM users where role='user'";
    const unq = await db.sequelize.query(qry , {
        nest: true,
        type: QueryTypes.SELECT
    });
    let unique_id = parseInt(unq[0]['unique_id'] + 1);
    params['unique_id'] = unique_id;
    params['uniqueToken'] = Math.floor(new Date().valueOf() * Math.random());
    params['paymentStatus'] = 0;
    params['approved']= 1;

    //Create user
    let new_user = await db.users.create(params);


    let res = [ {message:"Role create successful"} ,{new_user}] ;
    return res;
}



async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function updatePaymentDetails(params) {
    var save_arr = {
            "ordernumber":params.ordernumber,
            "status" : params.status,
            "response" : params.response,
            "checksum" :params.checksum
        };
    await db.paymentHistory.create(save_arr); 
    await db.sequelize.query('update users set paymentStatus=1 where uniqueToken= ' + params.ordernumber, {
        nest: true, 
        type: QueryTypes.UPDATE
    });
    return {"status" : params.status}
}
async function Rejectupdate(id, params) {
    const user = await reject(id);

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function reject(id){
    const list = await db.User.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}

async function userProfileUpdate (id , params){
    const user = await getUser(id);
    Object.assign(user , params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

async function removeNotify(id) {
    const user = await delByID(id);
    await user.destroy();
}

async function delByID(id){
    const list = await db.notifications.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}

async function userimageUpdate (id , params){
    const user = await getUser(id);
    Object.assign(user , params);
    await user.save();

    return omitHash(user.get());
}

async function rejectUser(id , reject_message) {
    const user = await db.sequelize.query('select id, email from users  where role = "user" and id =' + id , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if(!user){
        throw 'User Not Found';
    }
  

    if(user.approved == 3){
        throw 'User already rejected';
    }

    await db.sequelize.query('update users set approved=3 where id= ' + id, {
        nest: true, 
        type: QueryTypes.UPDATE
    });


    if(!user){
        throw 'Unable to reject please Try Again'
    }
    rejectMail(user[0],reject_message)
    return {message : 'send'};
}

async function rejectMail(params,reject_message){
    let emails = [];

        var save_arr = {
            "subject":"Your Profile Is Rejected",
            "message":"Rejected: "+reject_message,
            "notification_user_id":params["id"],
        };
        
        emails.push(params["email"]);
        await db.notifications.create(save_arr); 
    

    if(emails.length != 0){
        emailService.rejectMail(config.email ,emails.join(","),save_arr["subject"],save_arr["message"])
    }
}

// helper functions

async function getUser(id) {
    var user = await db.users.findByPk(id);
    if (!user) throw 'User not found';
    
    let image  = await db.fileUploads.findOne({ where: {id: user.user_img_id } }); 
    let usser = user.get();
    if('filePath' in usser){
        usser['image'] = usser.filePath;
    }
    else{
        usser['image'] = "";

    }

    return user;

}

async function getUserProfile(id) {
    var user = await db.users.findByPk(id);

    if (!user) throw 'User not found';

    let image  = await db.fileUploads.findOne({ where: { id: user.user_img_id } }); 
    let usser = user.get();

    if( image == null){
        usser['image'] = "";
    }
    else{
        usser['image'] = image.filePath;
    }
    // const countryName  = await db.users.findOne({ where: { id: user.country_id } }); 
    // let country__name = user.get();
    // console.log(country__name);
    // country__name['countriesName'] = countryName.get().countryTitle;

   
    return user;
}



function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}


async function approveUser(userId , params){
    let user = await db.users.findOne({ where: { id: userId, role:'user' } });
    console.log(user.dataValues)
    if (!user) {
        throw 'User not found';
    }

    if(user.get().approved == 2){
        throw 'User already approved';
    }

    let res = await db.users.update(
        { approved: 2 }, 
        {where: { id: userId  }
    });
    
    if(!res){
        throw 'Unable to approve user. Please try again.'
    }

    let Query = 'select email , hash from users where role = "user" and approved = "2" and id = "' + userId + '"';
    const newQuery = await db.sequelize.query(Query, {
        nest: true,
        type: QueryTypes.SELECT
    });

    let emails = [];

        var save_arr = {
            "subject":"Welcome to AATM family",
            // "message":" Dear,"+ user.dataValues.firstName + "<br/>"+ user.get().email   + "Approved",
            "message":`Dear, ${user.dataValues.firstName} ${user.dataValues.lastName} <br/> 
            Thank you very much for showing interest in Asian Association of Transfusion Medicine (AATM). On behalf of the AATM Executive Council and Governing
            Council, I welcome you to the AATM family as Annual member. You have been enrolled as an AATM member and your AATM annual membership number is
            AATM/000/AN/IR.<h6> Please find your login details below :</h6>
            User ID : <strong>${user.get().email}</strong><br/>
            Password : <strong>123456</strong><br/>
            <small style="color:red;">NOTE : Please Change your Password After Login Into Your Profile.</small>
            <br/>
            You are now privileged to enjoy all benefits of AATM members which are AATM fellowship program; AATM Working Groups; organizing wet workshop at your
            center (first cum first service & free to the center); receiving AATM E-NewsLetter, enjoying discounted registration fees at annual international conferences
            etc. You are encouraged to send your scientific articles to the peer reviewed journal of AATM (Global Journal of Transfusion Medicine;<a href="">www.gitm.org</a>).
            Moreover, you are a part of wide network of 19 countries where AATM has Country chapters. All updated news of our organization will be available in its
            interactive website <a href="www.aatmweb.org">www.aatmweb.org</a>.
            <br/>
            AATM operates on the principal of United Nation. It has an Executive Council with arbitrator role and Governing Council to supervise day to day functions. All
            Country chapters are working independently and all AATM programs are managed at country level. You are requested to contact 
            <h6 style="display:inline;">Dr.(Prof) Peyman Eshghi</h6> who is the Chairperson of AATM Iran chapter.
            `,
            "notification_user_id":userId,
        };
        emails.push(user.get().email);
        await db.notifications.create(save_arr); 
    
    if(emails.length != 0){
        emailService.rejectMail(config.email ,emails.join(","),save_arr['subject'],save_arr['message'])
    }

    return true;

}

async function getPaymentDetails(params){
    let Query = 'select * from users where uniqueToken = "' + params.Token + '" AND paymentStatus = 0 AND role = "user"';
    const newQuery = await db.sequelize.query(Query, {
        nest: true,
        type: QueryTypes.SELECT
    });

    return newQuery[0];
}
async function approveMail(params){
    let Query = 'select email , hash from users where role = "user" and approved = "2" and id = "' + params.id + '"';
    const newQuery = await db.sequelize.query(Query, {
        nest: true,
        type: QueryTypes.SELECT
    });

    let emails = [];
    for(let j in newQuery){
        var save_arr = {
            "subject":"Your Profile Is Approved",
            "message": params['email'] +  params['hash']  + "Approved",
            "notification_user_id":newQuery[j]["id"],
        };
        emails.push(params["email"]);
        await db.notifications.create(save_arr); 
    }

    if(emails.length != 0){
        emailService.rejectMail(config.email ,emails.join(","),"Your Profile Is Approved",params['email'] + params['hash']+ "  Rejected")
    }
}

async function getNotifications(user_id){
    return  await db.notifications.findAll(
        {
            where:{notification_user_id:user_id},
            order: [
                ['createdAt', 'DESC'],
            ],
        }
    );
}

async function getNotificationsById(user_id) {
    return await getNotify(user_id);
}

async function getNotify(id){
    const list = await db.sequelize.query('select * from notifications where user_id = '+ id , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;
}

async function updatePassword(id,data){

       
    const user = await db.users.scope('withHash').findOne({ where: { id:id,role:'user' } });
   

    if (!user)
        throw 'User not found';
    
    if(data.Confirmpassword != data.newpassword){
        throw 'Passwords do not match';
    }

    if(!(await bcrypt.compare(data.Oldpassword, user.hash)))
        throw 'Old Password is incorrect';
    

    let params = {
        hash:await bcrypt.hash(data.newpassword, 10),
    }


    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return {"success":"success"};
      
  
}


async function AdminupdatePassword(id,data){
    const user = await db.users.scope('withHash').findOne({ where: { id:id,role:'admin' } });
   
    if (!user)
        throw 'User not found';
    
    if(data.Confirmpassword != data.newpassword){
        throw 'Passwords do not match';
    }

    if(!(await bcrypt.compare(data.Oldpassword, user.hash)))
        throw 'Old Password is incorrect';
    

    let params = {
        hash:await bcrypt.hash(data.newpassword, 10),
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
    return {"success":"success"};
}

async function getallapproveusers(){
    const data = await db.sequelize.query('select * from users  where role = "user" and paymentStatus = 1', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = {rows:data}
    return res;
}


//Get Only Country Users-------
async function getBycountry(id){
    return await getsubadmin(id);
}

async function getsubadmin(id){
    const list = await db.sequelize.query(`select u.* , cl.countryTitle from users as u left join  countrylists as cl on cl.id = u.country_id  where role = 'user' and u.paymentStatus = 0 and country_id =  ${id}`  , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;
}

async function approveUserBycountry(id){
    const list = await db.sequelize.query(`select u.* , cl.countryTitle from users as u left join  countrylists as cl on cl.id = u.country_id where role = 'user' and u.paymentStatus = 1 and country_id = ${id} and approved = 2`  , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;

}

async function rejectUserBycountry(id){
    const list = await db.sequelize.query(`select u.* , cl.countryTitle from users as u left join  countrylists as cl on cl.id = u.country_id where role = 'user' and  country_id =  ${id} and approved = 3`  , {
    // const list = await db.sequelize.query(`select u.* , cl.countryTitle from users as u left join  countrylists as cl on cl.id = u.country_id where role = 'user' and country_id = (select country_id from users where role = 'subadmin' and country_id = ${id} )and approved = 3`  , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    return list;

}


async function roleGet(){
    const data = await db.sequelize.query('select u.* , cl.countryTitle from  users as u LEFT join countrylists as cl on  u.country_id = cl.id where role = "subadmin"', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = {rows:data}
    return res;
}

async function roleupdate(id , params){
    const lists = await getroledata(id)

    Object.assign( lists , params);;
    await lists.save();
    
    return omitHash(lists.get()); 
}

async function getroledata(id){
    const list = await db.users.findByPk(id);

    if (!list) throw 'No record found';

    return list;
}




async function getTransitionstatus(id){
    const list = await db.sequelize.query(`SELECT us.uniqueToken , ph.* from users as us INNER JOIN paymentHistorys as ph on us.uniqueToken = ${id} where us.uniqueToken = ph.ordernumber;` , {
        nest: true,
        type: QueryTypes.SELECT
    });
    if (!list) throw 'No record found';
    list[0].response = JSON.parse(list[0].response)
    return list;
}