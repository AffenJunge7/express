const IssueSchema = require("./issue");

/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Day schema
 */

const DaySchema = new Schema({
  date: { type: Date },
  issues: IssueSchema.schema
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

DaySchema.method({});

/**
 * Statics
 */

DaySchema.static({});

/**
 * Register
 */

const Day = mongoose.model("Day", DaySchema);

module.exports = Day;
