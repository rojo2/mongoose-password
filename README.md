# Mongoose Password plugin

Mongoose password plugin using [password](https://github.com/rojo2/password)

```javascript
const password = require("rojo2-mongoose-password");
const {Schema} = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(password);

```

Made with ❤ by ROJO 2 (http://rojo2.com)

