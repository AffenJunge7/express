/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  email: { type: String, required: true, default: "" },
  password: { type: String, default: "" },
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

UserSchema.method({});

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

const User = mongoose.model("User", UserSchema);

module.exports = User;
