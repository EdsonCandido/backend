const Sequelize = require("sequelize");
const db_config = require("../config/database");

/**
 * import models
 */
const Users = require("../models/Users");
const Types = require("../models/Types");
const Companies = require("../models/Companies");
const UserTypes = require("../models/UserTypes");
const Rooms = require("../models/Rooms");
const Totems = require("../models/Totems");
const Clerk = require("../models/Clerks");

const connection = new Sequelize(db_config);

Users.init(connection);
Companies.init(connection);
Types.init(connection);
UserTypes.init(connection);
Rooms.init(connection);
Totems.init(connection);
Clerk.init(connection);

module.exports = connection;
