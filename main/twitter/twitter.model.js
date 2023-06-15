const { DataTypes } = require('sequelize');

module.exports = {twitter , countries};




function countries(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        countryName : {type : DataTypes.STRING , allowNull: false},
        woeID: { type: DataTypes.INTEGER, allowNull: false },

    };

    return sequelize.define('countries', attributes);
}

function twitter(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Hashtag : {type : DataTypes.STRING , allowNull: false},
        url: { type: DataTypes.STRING, allowNull: false },
        tweetvolume: { type: DataTypes.INTEGER, allowNull: true },
        tweetquery: { type: DataTypes.TEXT, allowNull: true },

    };

    return sequelize.define('twitter', attributes);
}



