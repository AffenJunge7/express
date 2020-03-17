/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * issueTypes schema
 */

const issueTypeSchema = new Schema({
  name: { type: String, required: true, default: "" },
  description: { type: String, default: "" },
  date: { type: Date, default: Date.now }
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

issueTypeSchema.method({});

/**
 * Statics
 */

issueTypeSchema.static({});

/**
 * Register
 */

const IssueType = mongoose.model("IssueType", issueTypeSchema);

module.exports = IssueType;
