const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
  },

  lastName: {
    type: String,
    lowercase: true,
    trim: true,
  },

  // Eg :- Service Provider , Invester etc
  userType: {
    type: String,
    required: true,
    enum: ["Employer", "Freelancer"],
    default: "Freelancer",
  },

  userRole: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  phoneNo: {
    type: String,
    //required: true,
    trim: true,
    unique: [true, "Account with this number Already Exist"],
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Account with this email Already Exist"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },

  degree: Array,

  experience: Array,

  emailVerified: {
    type: Boolean,
    default: false,
  },
  website: {
    type: String,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
  },
  linkedIn: {
    type: String,
    trim: true,
    lowercase: true,
  },
  whatsappNo: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },

  isMember: {
    type: Boolean,
    default: false,
  },

  planExpires: {
    type: Date,
  },
  subscriptionType: {
    type: String,
  },
  subscibedOn: {
    type: Date,
  },

  password: {
    type: String,
    required: [true, "Password is required to Signup/Login"],
    minlength: 8,
    select: false,
  },
  // 	passwordConf: {
  //     type: String,
  //     // required: true,
  //     validate: {
  //       //This will work only with CREATE and SAVE
  //       validator: function (el) {
  //         return el === this.password;
  //       },
  //     },
  //   },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userProfile: {
    type: String,
    default: "/assets/profile.png",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
