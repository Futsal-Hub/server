const http = require("http")
const app = require("./app")
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const PORT = 3000


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
  console.log("listening")
})