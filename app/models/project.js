/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Project schema
 */

const ProjectSchema = new Schema({
  name: { type: String, required: true, default: "" },
  description: { type: String, default: "" },
  key: { type: String, default: "" },
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

ProjectSchema.method({});

/**
 * Statics
 */

ProjectSchema.static({});

/**
 * Register
 */

const User = mongoose.model("Project", ProjectSchema);

module.exports = User;
