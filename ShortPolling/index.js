import express from "express";
import path from "path";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

app.get("/fetchData", (req, res) => {
  const date = new Date();
  return res.send({ date: date.toLocaleTimeString() });
});

app.listen(PORT, () => {
  console.log("server running - " + PORT);
});
