const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

let patientStatus = "Idle";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("status", patientStatus);

  socket.on("typing", (data) => {
    patientStatus = "Typing...";
    io.emit("patient-data", data);
    io.emit("status", patientStatus);
  });

  socket.on("submit", (data) => {
    patientStatus = "Submitted";
    io.emit("patient-data", data);
    io.emit("status", patientStatus);
  });

  socket.on("disconnect", () => {
    patientStatus = "Idle";
    io.emit("status", patientStatus);
  });
});