import express from "express";
import path from "path";

const app = express();

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-cache");

  res.write("data: Welcome to Server sent event\n\n");

  const intervalId = setInterval(() => {
    res.write(`data: Server Time: ${new Date().toLocaleTimeString()}\n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

app.listen(4000, () => {
  console.log("Running on port 4000");
});
