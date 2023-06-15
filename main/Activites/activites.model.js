const { DataTypes } = require('sequelize');

module.exports = {
    activiteslists,
    activitesevents
}

function activiteslists(sequelize) {
    const attributes = {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        banner : {type: DataTypes.STRING , allowNull: false},
        Title : {type: DataTypes.STRING , allowNull: false},
        Description : {type: DataTypes.STRING , allowNull: false},
    }
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
     return sequelize.define('activiteslists' , attributes , options)
}

function activitesevents(sequelize){
    const attributes = {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       ActiviteName: { type: DataTypes.STRING, allowNull:false},
       content: { type: DataTypes.STRING, allowNull:true},
       image: { type: DataTypes.STRING, allowNull:true},
       ActiviteeventTitle: { type: DataTypes.STRING, allowNull:false},
       Activiteeventauthor: { type: DataTypes.STRING, allowNull:false},
       startDate : {type: DataTypes.DATE , allowNull : false},
       endDate : {type: DataTypes.DATE , allowNull : false},
     }
     const options = {
        defaultScope: { attributes: { exclude: ['hash'] } },
        scopes: {  withHash: { attributes: {}, }  }
    };
    return sequelize.define('activitesevents', attributes , options );
}