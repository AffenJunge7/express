/**
 * Expose
 */

module.exports = {
  db:
    process.env.MONGODB_URL ||
    "mongodb+srv://mongoUSer:SJzmK6VNlsxck8zZ@express-ce1oy.mongodb.net/test?retryWrites=true&w=majority"
};
