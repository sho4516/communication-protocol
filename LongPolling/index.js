import express from "express";
import path, { join } from "path";

const app = express();
const PORT = 4000;

let waitingClients = [];
let data = "initial_data";

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

app.get("/getData", (req, res) => {
  if (req.query.lastData != data) {
    res.json(data);
  } else {
    // request will persist for max 30 mins
    const timer = setTimeout(() => {
      console.log(`No data change - ${data}`);
      waitingClients = waitingClients.filter((client) => client.res != res);
    }, 1800000);

    waitingClients.push({ res, timer });
  }
});

app.get("/updateData", (req, res) => {
  data = req.query.data;
  waitingClients.forEach(({ res, timer }) => {
    clearTimeout(timer);
    res.json(data);
  });
  waitingClients = [];
  return res.json({
    success: true,
    message: "Data updated and clients notified",
  });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
