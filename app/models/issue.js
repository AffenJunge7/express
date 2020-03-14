/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Issue schema
 */

const IssueSchema = new Schema({
  name: { type: String, default: "" }
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

IssueSchema.method({});

/**
 * Statics
 */

IssueSchema.static({});

/**
 * Register
 */

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;
