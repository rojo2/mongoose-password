const password = require("password");

/**
 * Plugin that adds to a mongoose Schema
 * a pbkdf2 password hashing.
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports = function(schema, options) {

  schema.add({
    password: {
      type: String
    }
  });

  schema.method("hasPassword", function(passwordToVerify) {
    return password.verify(passwordToVerify, this.password);
  });

  schema.pre("save", function(next) {
    if (this.isModified("password")) {
      password.hash(this.password).then((hashedPassword) => {
        this.password = hashedPassword;
        return next();
      }).catch((error) => {
        return next(error);
      });
    } else {
      return next();
    }
  });

};
