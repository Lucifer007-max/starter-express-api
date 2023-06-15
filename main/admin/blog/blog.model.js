const { DataTypes } = require('sequelize');

module.exports = {
    blogcategory,
    blog
};

function blogcategory(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoryName: {type: DataTypes.STRING , allowNull: false}
    }
    return sequelize.define('blogcategory', attributes);
}

function blog(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoryID: {type: DataTypes.STRING , allowNull: false},
        blogDate: {type: DataTypes.STRING , allowNull: false},
        blogTitle: {type: DataTypes.STRING , allowNull: false},
        blogImage: {type: DataTypes.STRING , allowNull: true},
        blogDescription: {type: DataTypes.TEXT , allowNull: false},
    }
    return sequelize.define('blog', attributes);
}