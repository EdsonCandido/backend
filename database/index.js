const Sequelize = require("sequelize");
const db_config = require("../config/database");

/**
 * import models
 */
const Users = require("../models/Users");
const Clerk = require("../models/Clerks");
const Totems = require("../models/Totems");
const Companies = require("../models/Companies");
const Rooms = require("../models/Rooms");
const Interpreters = require("../models/Interpreters");

const connection = new Sequelize(db_config);

Users.init(connection);
Clerk.init(connection);
Totems.init(connection);
Interpreters.init(connection);
Companies.init(connection);

Rooms.init(connection);

module.exports = connection;
