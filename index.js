const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST: Dialogflow or custom frontend webhook
app.post("/webhook", async (req, res) => {
  const params = req.body.queryResult?.parameters || req.body; // handles both Dialogflow & custom

  const name = params.patient_name || params.name || "Guest";
  const dob = params.dob || "not provided";
  const department = params.department || "General";
  const date_time = params.date_time || "soon";

  // Log the appointment request
  console.log("📅 Appointment booked:", { name, dob, department, date_time });

  const reply = `Thanks ${name}, your appointment with ${department} is confirmed for ${date_time}.`;

  res.json({
    fulfillmentText: reply,
    reply, // also support plain .reply for non-Dialogflow clients
  });
});

// GET: for browser check
app.get("/", (req, res) => {
  res.send("✅ Jessica backend is running fine on Render!");
});

// Port fix for Render: must ONLY use process.env.PORT
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`✅ Jessica backend live on port ${port}`);
});
