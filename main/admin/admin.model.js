const { DataTypes } = require('sequelize');

module.exports = {
    roles,
    faq,
    cards,
    logo
};

function roles(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleName: {type: DataTypes.STRING , allowNull: false}
    }
    return sequelize.define('roles', attributes);
}
function faq(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        faqTitle: {type: DataTypes.TEXT , allowNull: false},
        faqDescription: {type: DataTypes.TEXT , allowNull: false}
    }
    return sequelize.define('faq', attributes);
}
function cards(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cardTitle: {type: DataTypes.TEXT , allowNull: false},
        cardDescription: {type: DataTypes.TEXT , allowNull: false}
    }
    return sequelize.define('cards', attributes);
}

function logo(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        logoImage: {type: DataTypes.TEXT , allowNull: false},
    }
    return sequelize.define('logo', attributes);
}