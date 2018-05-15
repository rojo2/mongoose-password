import isString from "@rojo2/is-string";
import password from "@rojo2/password";

/**
 * Plugin that adds to a mongoose Schema
 * a PBKDF2 password hashing using @rojo2/password
 *
 * @param {mongoose.Schema} schema
 * @param {Object} [options={}]
 */
export default function plugin(schema, options = {}) {

  const defaultOptions = {
    propertyName: "password",
    methodName: "hasPassword",
    keyLength: 4096,
    iterations: 100000,
    digest: "sha512",
    separator: ":",
    salt: undefined
  };

  const opts = {
    ...defaultOptions,
    ...options
  };

  if (!isString(opts.propertyName) || !opts.propertyName.trim()) {
    throw new Error("Invalid property name");
  }

  if (!isString(opts.methodName) || !opts.methodName.trim()) {
    throw new Error("Invalid method name");
  }

  if (!Number.isFinite(opts.keyLength)) {
    throw new Error("Invalid key length");
  }

  if (!Number.isFinite(opts.iterations)) {
    throw new Error("Invalid iterations");
  }

  schema.add({
    [opts.propertyName]: {
      type: String
    }
  });

  schema.method(opts.methodName, function(passwordToVerify) {
    return password.verify(passwordToVerify, this[opts.propertyName]);
  });

  schema.pre("save", function(next) {
    if (this.isModified(opts.propertyName)) {
      return password
        .hash(this.password, opts.salt, opts.iterations, opts.keyLength, opts.digest, opts.separator)
        .then((hashedPassword) => {
          this[opts.propertyName] = hashedPassword;
        });
    }
    return Promise.resolve();
  });

}
