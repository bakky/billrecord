"use strict";

/**
 * Module dependencies.
 */

var mongoskin = require('mongoskin');
var config = require('../config');

var noop = function () {};

var db = mongoskin.db(config.db);
db.bind('bill');
db.bill.ensureIndex({ finished: 1 }, noop);

module.exports = db;