/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Day schema
 */

const IssueSchema = new Schema({
  issueType: { type: String, default: "Default Issue Type" },
  name: { type: String, default: "Placeholder for Issue Name" }
});

const DaySchema = new Schema({
  date: { type: Date },
  issues: [IssueSchema]
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
