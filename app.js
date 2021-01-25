if (process.env.NODE_ENV === "development") { require("dotenv").config()}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const routes = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

io.on("connection", (socket) => {
  console.log("user connected")
  socket.on("update", (args) => {
    console.log(args, "<<< args");
  })

  socket.on("finish addBooking", () => {
    io.emit("fetch booking")
  })
})


server.listen(PORT, () => {
  console.log("app listen on port", PORT);
});

module.exports = app;
