const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
// The hashing done by bcrypt is CPU intensive, so the sync version will block other functions from running, effectively stalling the application until the hashing process has been completed.
const bcrypt = require('bcrypt');

// create our User Model
class User extends Model {
    // sets up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        // Using the keyword this, we can access this user's properties, including the password, which was stored as a hashed string.
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            // this means the password must be at least four characters long
            len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifestyle "hook" functionality
            // The async keyword is used as a prefix to the function that contains the asynchronous function.
            async beforeCreate(newUserData) {
                // We pass in the "userData" object that contains the plaintext password in the "password" property and a saltRound value of 10.
                // await can be used to prefix the async function, which will then gracefully assign the value from the response to the newUserData's password property.
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifestyle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;