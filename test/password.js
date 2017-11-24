const {expect} = require("chai");
const mongoose = require("mongoose");
const password = require("../password");

describe("Mongoose Password", function() {

  this.timeout(5000);

  before((done) => {

    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/mongoose-test", { useMongoClient: true }, (err) => {

      if (err) {
        return done(err);
      }

      const UserSchema = new mongoose.Schema({
        email: {
          type: String,
          unique: true
        }
      });

      UserSchema.plugin(password);

      const User = mongoose.model("user", UserSchema);
      User.remove().then(() => done());

    });

  });

  after((done) => {

    mongoose.disconnect(done);

  });

  it("should use hash the password", (done) => {

    const User = mongoose.model("user");

    const newUser = new User({
      email: "example@test.com",
      password: "pruebas"
    });

    newUser.save().then((savedUser) => {
      done();
    }).catch((err) => done(err));

  });

  it("should verify that the password is incorrect", (done) => {

    const User = mongoose.model("user");
    User.findOne({ email: "example@test.com" }).then((user) => {
      user.hasPassword("pru3b4$").then((verified) => {
        expect(verified).to.be.equal(false);
        done();
      }).catch((err) => done(err));
    }).catch((err) => done(err));

  });


  it("should verify that the password is correct", (done) => {

    const User = mongoose.model("user");
    User.findOne({ email: "example@test.com" }).then((user) => {
      user.hasPassword("pruebas").then((verified) => {
        expect(verified).to.be.equal(true);
        done();
      }).catch((err) => done(err));
    }).catch((err) => done(err));

  });

  it("should modify the password and then rehash it", (done) => {

    const User = mongoose.model("user");
    User.findOne({ email: "example@test.com" }).then((user) => {
      user.password = "pru3b4$";
      user.save().then((savedUser) => {
        savedUser.hasPassword("pru3b4$").then((verified) => {
          expect(verified).to.be.equal(true);
          done();
        }).catch((err) => done(err));
      }).catch((err) => done(err));
    }).catch((err) => done(err));

  });

});
