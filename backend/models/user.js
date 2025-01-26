const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    issueRaised: [
      {
        type: Schema.Types.ObjectId,
        ref: 'issue',
      },
    ],
    issueGiven: [
      {
        type: Schema.Types.ObjectId,
        ref: 'issue',
      },
    ],
    role: {
      type: String,
      default:"USER"
    },
    authorityOf:{
      type: String,
      default: "NONE"
    }
  },
  { timestamps: true }
);

const User = model('user', userSchema);


module.exports = User;
