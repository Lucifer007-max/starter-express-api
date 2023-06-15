const { DataTypes } = require('sequelize');

module.exports = {
    feedback,
};

function feedback(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullName: {type: DataTypes.STRING , allowNull: false},
        Message: {type: DataTypes.STRING , allowNull: false},
        Reference: {type: DataTypes.STRING , allowNull: false},
        Email: {type: DataTypes.STRING , allowNull: false},
    }
    return sequelize.define('feedback', attributes);
}