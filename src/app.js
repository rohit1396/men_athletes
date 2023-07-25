const express = require("express");
const app = express();
app.use(express.json());
require("./db/connect");

const AthleteRanking = require("./models/athlete");

const port = process.env.PORT || 8000;

app.post("/athletes", async (req, res) => {
  try {
    const athletesData = await new AthleteRanking(req.body);
    const athletes = await athletesData.save();
    res.status(201).send(athletes);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.get("/athletes", async (req, res) => {
  try {
    const getAthletes = await AthleteRanking.find().sort({
      ranking: 1,
    });
    res.status(200).send(getAthletes);
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
});

app.get("/athlete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getAthlete = await AthleteRanking.find({ _id: id });
    res.status(200).send(getAthlete);
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
});

app.patch("/athlete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateAthlete = await AthleteRanking.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    res.status(200).send(updateAthlete);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/athlete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteAthlete = await AthleteRanking.findByIdAndDelete({ _id: id });
    res.status(200).send(deleteAthlete);
  } catch (err) {
    res.status(404).json({
      status: "failed",
    });
  }
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
