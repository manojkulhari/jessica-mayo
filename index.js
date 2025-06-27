const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const userQuery = (req.body.query || "").toLowerCase();
  console.log("Received:", userQuery);

  let name = "Guest";
  let department = "General";
  let date_time = "soon";

  // Extract basic info from the user query (rudimentary demo logic)
  if (userQuery.includes("my name is")) {
    name = userQuery.split("my name is")[1].trim().split(" ")[0];
  }
  if (userQuery.includes("cardiology")) department = "Cardiology";
  else if (userQuery.includes("dermatology")) department = "Dermatology";
  else if (userQuery.includes("pediatrics")) department = "Pediatrics";

  if (userQuery.includes("tomorrow")) date_time = "tomorrow";
  else if (userQuery.includes("next week")) date_time = "next week";
  else if (userQuery.match(/\d{1,2} ?(am|pm)/)) {
    const match = userQuery.match(/\d{1,2} ?(am|pm)/);
    date_time = match[0];
  }

  const reply = `Thanks ${name}, your appointment with ${department} is confirmed for ${date_time}.`;
  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("Jessica Webhook is live ✅");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("✅ Jessica backend live on port", port);
});
