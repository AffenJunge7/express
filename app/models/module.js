/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Modules schema
 */

const ModuleSchema = new Schema({
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

ModuleSchema.method({});

/**
 * Statics
 */

ModuleSchema.static({});

/**
 * Register
 */

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
