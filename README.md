# Mongoose Password plugin
![Travis CI](https://travis-ci.org/rojo2/mongoose-password.svg?branch=master)

Mongoose password plugin using [@rojo2/password](https://github.com/rojo2/password)

```javascript
import password from "@rojo2/mongoose-password";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
});

UserSchema.plugin(password);
```

Made with :heart: by ROJO 2 (http://rojo2.com)

