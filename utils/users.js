
var clients = [{cookie:'5wwd1', username:'61', chatPeers: [3434], groupNumber:'002'}];
var groups = [{id:'541', clients: [0,1,2,3,4,5,6,7,8,9,10, 11, 12, 13,14,15,16,17,18,19,20]}, {id:'356', clients: [
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]}, 
              {id:'987', clients: [
                41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]}, {id:'002', clients: [
                  61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79]}];

var clientIDincrement = 80;
var groupsSpot = 0;

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
        const client = { cookie, username: String(clientIDincrement), chatPeers : [], groupNumber: assignedGroupNumber };
        clientIDincrement++;
        clients.push(client);
        return client
    }
    return clients
}

function getAssignedGroupNumber(clientsID){
  var allGroupsAreFull = 0;
  for(var i=0; i<groups.length; i++) {
    if(groups[i].clients.length<20){
      groups[i].clients.push(clientsID);  // ADD USER TO GROUP
      return groups[i].id;
    }
    if(i == groups.length-1 && groups[i].clients.length == 20){
      allGroupsAreFull = 1;
    }
  }
  if(allGroupsAreFull){
    // reduce to less than 80
    var reduced = groupsSpot % 80;
    var groupNum = 0;
    // Which group
    if(reduced<20) groupNum = 0;
    if(reduced>=20 && reduced <40) groupNum = 1;
    if(reduced>=40 && reduced <60) groupNum = 2;
    if(reduced>=60 && reduced <80) groupNum = 3;

        groups[groupNum].clients[groupsSpot%20] = clientsID;  // ADD USER TO GROUP
        console.log("razvrščen v skupino:"+ groupNum + "na mesto: " + groupsSpot %20);
        groupsSpot++;
        return groups[0].id;
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
    return clients;
  }

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(clientID) {
  for (var i=0; i < clients.length; i++) {
    if (clients[i].cookie === clientID) {
        return clients[i];
    }
  }
  return 0;
}
function getClientWithUsername(username) {
  for (var i=0; i < clients.length; i++) {
    if (clients[i].username == username) {
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

function switchQueueNumbers(clientID, username1, username2) {
  console.log(clients);
  console.log("switching: ", username1,"with: ", username2);
  var success =0;
  //Switch queue number in clients database
  for (var i=0; i < clients.length; i++) {
    if (clients[i].cookie == clientID && clients[i].username == username1) {
      for (var j=0; j < clients.length; j++) {
        if(clients[j].username == username2) {
          var storeUsername2queueNum = clients[j].groupNumber;
          clients[j].groupNumber = clients[i].groupNumber;
          clients[i].groupNumber = storeUsername2queueNum;
          console.log("zamenjeno v clients tabeli");
          success = success+0.5;
        }
      }
    }
  }
  // Switch in groups
  for(var k=0; k<groups.length; k++) {
    for(var l = 0; l< groups[k].clients.length; l++){
      if(groups[k].clients[l] == username1){
        for(var m=0; m<groups.length; m++) {
          var group2 = groups[m];
          for(var n = 0; n< groups[m].clients.length; n++){
            if(groups[m].clients[n] == username2){
              var storeUsername = groups[k].clients[l];
              groups[k].clients[l] = groups[m].clients[n];
              groups[m].clients[n] = storeUsername;
              success = success+0.5;
              console.log("menjava")
              break;
            }
          }
          if(success==1) break;
        }
      }
      if(success==1) break;
    }
    if(success==1) break;
  }
console.log(success);
  if(success == 1) return 1;
  else return 0
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
  getClientWithUsername,
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