// const{ default: mongoose} = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [4, "First Name must not contain more than 14 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [4, "Last Name must not contain more than 14 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxLength: [10, "Contact must contain 10 characters"],
      minLength: [10, "Contact must contain  10 characters"],
    },
    organizationlogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1682685797406-97f364419b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      },
    },
    organizationname: {
      type: String,
      required: [true, "oragnization Name is required"],
      minLength: [
        4,
        "organization Name must not contain more than 4 characters",
      ],
    },
    internships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "internship",
      },
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
    ],
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      required:[true,"password is required"],
      type: String,
      select: false,
      maxLength: [15, "password should not exeed more than 15 charcters"],
      minLength: [6, "password should have atleast 6 charcters"],
      //    match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,""]
    },

    resetPasswordToken: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

employeModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employe = mongoose.model("employe", employeModel);
module.exports = Employe;
