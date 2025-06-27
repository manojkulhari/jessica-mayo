const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory session simulation (reset every deploy/restart)
const sessions = {};

app.post("/webhook", (req, res) => {
  const userQuery = (req.body.query || "").toLowerCase();
  const sessionId = req.body.sessionId || "default";

  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      step: "ask_name",
      data: {}
    };
  }

  const session = sessions[sessionId];
  let reply = "";

  switch (session.step) {
    case "ask_name":
      reply = "Can I have your full name, please?";
      session.step = "get_name";
      break;

    case "get_name":
      session.data.name = userQuery;
      reply = `Hi ${session.data.name}, what is your date of birth?`;
      session.step = "get_dob";
      break;

    case "get_dob":
      session.data.dob = userQuery;
      reply = `Got it. Which department would you like to book an appointment with?`;
      session.step = "get_department";
      break;

    case "get_department":
      session.data.department = userQuery;
      reply = `And what date and time would you prefer for the appointment?`;
      session.step = "get_datetime";
      break;

    case "get_datetime":
      session.data.datetime = userQuery;
      reply = `Thanks ${session.data.name}, your appointment with ${session.data.department} is confirmed for ${session.data.datetime}.`;
      session.step = "done";
      break;

    case "done":
      reply = "Your appointment has already been booked. Do you need anything else?";
      break;

    default:
      reply = "I'm not sure how to help with that.";
  }

  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("Jessica backend is live ✅");
});

app.listen(port, () => {
  console.log(`✅ Jessica backend live on port ${port}`);
});
