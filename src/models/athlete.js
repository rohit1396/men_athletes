const express = require("express");
const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  format: {
    type: String,
    required: true,
  },
  ranking: {
    type: Number,
    unique: true,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  iplTeam: {
    type: String,
    required: true,
  },
});

const AthleteRanking = new mongoose.model("AthleteRanking", athleteSchema);

module.exports = AthleteRanking;
