/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * issueType schema
 */

const issueTypeSchemeFields = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

const issueTypeSchemeSchema = new Schema({
  name: { type: String, required: true, default: "" },
  description: { type: String, default: "" },
  fields: [issueTypeSchemeFields]
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
