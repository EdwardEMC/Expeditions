module.exports = io => {
  let activeSockets = [];
  
  //initial socket connection
  io.on("connection", socket => {
    let room = socket.handshake.query.room;
    let peer = socket.handshake.query.peer;

    // Stops multiple sockets from connecting
    if(typeof room == "undefined") {
      return;
    }

    console.log(`New user connected as: ${socket.id}`);
    
    // Keep track of active sockets, stops multiple connections from same sockets
    const existingSocket = activeSockets.find(
      existingSocket => existingSocket === socket.id
    );
  
    if (!existingSocket) {
      activeSockets.push({socket: socket.id});

      // member that just logged on
      let data = {
        socket: socket.id,
        name: peer
      }

      // emit updated user list to the room
      socket.to(room).emit("update-user-list", {
        joining: [data],
        online: activeSockets
      });
    };

    // Socket joins the leader/teachers room
    socket.join(room);
    console.log('User joined room: ' + room);
  
    // Disconnects socket on user leaving
    // Send user update to teacher on disconnect to update the active user modal
    socket.on("disconnect", () => {
      activeSockets = activeSockets.filter(
        existingSocket => existingSocket.socket !== socket.id
      );

      // change the active users on log out
      socket.to(room).emit("user-disconnected", {
        online: activeSockets,
        leaving: {
          socket: socket.id,
          name: peer
        }
      });

      //socket disconnects from all relationships
      socket.leaveAll();

      console.log(`User disconnected: ${socket.id}`);
    });

    //SOCKET COMMANDS
    //send the base64 of an image onto the rest of the room
    socket.on('image', image => {
      socket.to(room).emit("image", image);
    });
  });
};