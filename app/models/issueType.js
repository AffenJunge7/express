/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * issueType schema
 */

const issueTypeSchema = new Schema({
  name: { type: String, required: true, default: "" }
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

const IssueType = mongoose.model("issueType", issueTypeSchema);

module.exports = IssueType;
