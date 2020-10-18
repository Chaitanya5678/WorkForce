const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    function: {
      type: String,
      required: true,
    },
    subFunction: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    coreskills: {
      type: String,
      required: true,
    },
    coreskills2: {
      type: String,
      required: true,
    },
    coreskills3: {
      type: String,
      required: true,
    },
    softskills: {
      type: String,
      required: true,
    },
    softskills2: {
      type: String,
      required: true,
    },
    softskills3: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    compensation: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
