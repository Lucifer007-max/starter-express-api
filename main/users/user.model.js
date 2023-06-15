const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },       
        // contactNo: { type: DataTypes.INTEGER, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },

    };

    const options = {
        // defaultScope: {
        //     // exclude hash by default
        //     attributes: { exclude: ['hash'] }
        // },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('users', attributes, options);
}