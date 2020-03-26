/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * issueType schema
 */

const issueTypeSchemeSchema = new Schema({
  name: { type: String, required: true, default: "" },
  description: { type: String, default: "" }
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

issueTypeSchemeSchema.method({});

/**
 * Statics
 */

issueTypeSchemeSchema.static({});

/**
 * Register
 */

const IssueTypeScheme = mongoose.model(
  "IssueTypeScheme",
  issueTypeSchemeSchema
);

module.exports = IssueTypeScheme;
