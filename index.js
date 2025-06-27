const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const params = req.body.queryResult.parameters;
  const name = params.patient_name;
  const dob = params.dob;
  const department = params.department;
  const date_time = params.date_time;

  // Simulate saving (or log it for now)
  console.log("New Appointment:", { name, dob, department, date_time });

  res.json({
    fulfillmentText: `Thanks ${name}, your appointment with ${department} is confirmed for ${date_time}.`
  });
});

app.get("/", (req, res) => {
  res.send("Jessica Webhook is live!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
