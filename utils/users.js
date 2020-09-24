
var clients = [];
var groups = [{id:'541', clients: []}, {id:'356', clients: []}, 
              {id:'987', clients: []}, {id:'002', clients: []}];

var clientIDincrement = 1;

class client {
    constructor(cookie) {
      this.cookie = cookie;
      this.username = 0;
      this.chatPeers = [];
      this.groupNumber = 0;
    }
  }
class group {
  constructor(ip_address) {
    this.id = id;
    this.clients = [];
  }
}

// Create and push client to array when they open the website
function createClient(cookie) {
    const found = clients.some(el => el.cookie === cookie);
    if (!found){
    // Create client object
        var assignedGroupNumber = getAssignedGroupNumber(clientIDincrement);
        const client = { cookie, username: clientIDincrement, chatPeers : [], groupNumber: assignedGroupNumber };
        clientIDincrement++;
        clients.push(client);
        return client
    }
    return clients
}

function getAssignedGroupNumber(clientsID){
  for(var i=0; i<groups.length; i++) {
    if(groups[i].clients.length<20){
      groups[i].clients.push(clientsID);  // ADD USER TO GROUP
      return groups[i].id;
    }
  }
  return 0;
}

// Get matching queue number
function getClientsQueueNumber(clientID){
    for (var i=0; i < clients.length; i++) {
        if (clients[i].cookie === clientID) {
            return clients[i].groupNumber;
        }
    }
    return 0;
}
function getAllGroups() {
  console.log(groups);
  return groups;
}

function getUsersInGroup(groupID){
  for (var i=0; i < groups.length; i++) {
    if (groups[i].id == groupID) {
        return groups[i].clients;
    }
}
return 0;
}
// Join user to chat
function getAllClients() {
    console.log(clients);
    return clients;
  }

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(clientIp) {
  for (var i=0; i < clients.length; i++) {
    if (clients[i].clientIp === clientIp) {
        return clients[i];
    }
  }
  return 0;
}

// Mark new chat peer
function markOpenedChatForUser(username1, username2) {
  console.log(clients);
  for (var i=0; i < clients.length; i++) {
    if (clients[i].username == username1) {
        if(!clients[i].chatPeers.includes(String(username2))){
          clients[i].chatPeers.push(username2);
          console.log(clients[i]);
          return 1;
        }
    }
  }
  return 0;
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function switchQueueNumbers(clientIp1, username1, username2) {
  for (var i=0; i < clients.length; i++) {
    if (clients[i].clientIp === clientIp1 && clients[i].username == username1) {
      for (var j=0; j < clients.length; j++) {
        if(clients[j].username == username2) {
          var storeUsername2 = clients[j].username;
          clients[j].username = clients[i].username;
          clients[i].username = storeUsername2;
          return 1;
        }
      }
    }
  }
  return 0
}

function wipeChatPeers (user1, user2) {
  for (var i=0; i < clients.length; i++) {
    if (clients[i].username == user1 || clients[i].username == user2) {
      clients[i].chatPeers.length = 0;
    }
  }
  return 0;
} 
/*DANGER*/

function deleteAllUsers () {
  console.log(clients)
  clients.length = 0;
  console.log(clients)
  return 0;
} 
module.exports = {
  createClient,
  getClientsQueueNumber,
  getAllGroups,
  getAllClients,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  switchQueueNumbers,
  markOpenedChatForUser,
  wipeChatPeers,
  deleteAllUsers,
  getUsersInGroup
};