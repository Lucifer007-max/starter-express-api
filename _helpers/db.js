const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mysql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

   

    // connect to db
    console.log('dbName',dbName);
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.users = require('../main/users/user.model')(sequelize);
    db.fileUploads = require('../main/fileUploads/fileUploads.model')(sequelize);

    let blog = require('../main/admin/blog/blog.model');
    db.blogcategory = blog.blogcategory(sequelize);
    db.blog = blog.blog(sequelize);

    let twitter = require('../main/twitter/twitter.model');
    db.countries = twitter.countries(sequelize) 
    db.twitter = twitter.twitter(sequelize) 

    let admin  = require('../main/admin/admin.model');
    db.faq = admin.faq(sequelize)
    db.cards = admin.cards(sequelize)
    db.logo = admin.logo(sequelize)

    let feedback = require('../main/feedback/feeback.model');
    db.feedback = feedback.feedback(sequelize)
    // db.feedback = require('../main/feedback/feeback.model');
    // For Raw Querys
    db.sequelize = sequelize;
    

    // sync all models with database
    // await sequelize.sync({ alter: true});
}
