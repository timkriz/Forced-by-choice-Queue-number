
var rooms = [];

class room {
    constructor(roomID, chatLogs, username1, username2) {
      this.roomID = roomID;
      this.chatLogs = [];
      this.user1 = username1;
      this.user2 = username2;
    }
  }

// Create and push client to array when they open the website
function createRoom(roomID, username1, username2) {
    const found = rooms.some(el => el.roomID === roomID);
    if (!found){
        const newRoom = { roomID: roomID, chatLogs: [], username1: username1, username2: username2 };  //CREATE ROOM
        rooms.push(newRoom);
        console.log(rooms);
    }
    return rooms
}

function pushNewMessage(roomID, message) {
    for (var i=0; i < rooms.length; i++) {
        if (rooms[i].roomID === roomID) {
            rooms[i].chatLogs.push(message);
        }
    }
    return message;
}
function wipeChatLogs(roomID) {
    for (var i=0; i < rooms.length; i++) {
        if (rooms[i].roomID === roomID) {
            rooms[i].chatLogs.length = 0;
        }
    }
    return 0;
}
function getAllMessagesInRoom(roomID) {
    for (var i=0; i < rooms.length; i++) {
        if (rooms[i].roomID === roomID) {
            return rooms[i].chatLogs;
        }
    }
    return 0;
}
function deleteAllRooms () {
    rooms.length = 0;
    return 0;
  } 
module.exports = {
    createRoom,
    pushNewMessage,
    wipeChatLogs,
    getAllMessagesInRoom,
    deleteAllRooms
};