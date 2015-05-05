//Including dependency
var Sequelize = require("sequelize");
var bcrypt = require('bcrypt-nodejs');

//Setting up the config
var sequelize = new Sequelize('sample', 'root', 'cloudera', {
    host: 'localhost',
    port: 3306,
    logging: false,
    omitNull: true,


});


//Checking connection status
sequelize.authenticate().complete(function (err) {
 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }
});



var ImageDB = sequelize.define('ImageDB', {
	id: {type: Sequelize.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
	file: {type: Sequelize.TEXT, allowNull:false},
	
});
console.log(sequelize);
//Applying Item Table to database
sequelize.sync().complete(function (err) {
 if(err){
    console.log('An error occur while creating table', err);
 }else{
    console.log('Item table created successfully');
 }
});


module.exports = ImageDB;


