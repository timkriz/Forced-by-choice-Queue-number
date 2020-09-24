const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
var username1 = 0;
var username2 = 0;
var user1 ={};
var user2 ={};

// Get username and room numbers
const matches1 = document.getElementById('username1-name').innerHTML.match(/(\d+)/);
const matches2 = document.getElementById('username2-name').innerHTML.match(/(\d+)/);
if (matches1 && matches2) { 
    username1 = matches1[0];
    username2 = matches2[0];
}
else {
    document.getElementById('username1-name').innerHTML = 'Can\'t find the other person.';
}

socket.emit('get_user_by_username', {username2});
/*Get numbers of chatting users */
socket.emit('get_user', '');
socket.on('user', message => {
    user1=message;
    document.getElementById('queueNum1').innerHTML = message.groupNumber;
    document.getElementById('queueNum11').innerHTML = message.groupNumber;
    document.getElementById('username1-number').innerHTML = "Number <b>" + message.groupNumber;
})

socket.on('user_by_username', message => {
    user2=message;
    document.getElementById('queueNum2').innerHTML = message.groupNumber;
    document.getElementById('queueNum22').innerHTML = message.groupNumber;
    document.getElementById('username2-number').innerHTML = "Number <b>" + message.groupNumber;
}) 

// Get unique ID for chat room from usernames
var roomID = getUniqueRoomID(username1, username2);
console.log("roomID:", roomID)

// Join chatroom
socket.emit('joinRoom', { roomID, username1, username2 });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Message from server
socket.on('message', message => {
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Get all messages in this room
socket.on('allMessagesInRoom', messages => {
    for (var i = 0; i< messages.length; i++){
        outputMessage(messages[i]);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;
    // Emit message to server
    socket.emit('chatMessage', {roomID, msg, username1, username2});
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    if(message.username == ''){
    div.innerHTML = `
    <p class="text">
        ${message.text}
    </p>`;
    }
    else {
        div.innerHTML = `<p class="meta">User ${message.username} <span>${message.time}</span></p>
        <p class="text">
            ${message.text}
        </p>`;
    }
    // Seperate left and right
    if(message.username == username1){
        div.style.textAlign = "right";
    }
    document.querySelector('.chat-messages').appendChild(div);
}

function getUniqueRoomID(username1, username2) {
    minAB = Math.min(username1, username2);
    maxAB = Math.max(username1, username2);
    return ((maxAB*(maxAB+1))/2) + minAB;
}

/**************** INITIALIZED TRADE WINDOW  ****************/
// TRADE BUTTON
const overlayEl = document.getElementById("overlay");
const PopUpWindowEl = document.querySelector('.popUpWindow');
const closePopUpButton = document.querySelector('.popupCloseButton');
const tradeButtonYesEl = document.getElementById('tradeButtonYes');
const tradeButtonNoEl = document.getElementById('tradeButtonNo');

function tradeButtonClick () {
    // Are you sure you want to trade
    overlayEl.style.display = "block";
    return 0;
}

// Yes
tradeButtonYesEl.addEventListener('click', (e)=> {
    console.log("YAAAASS")
    const newLoadingMessage = document.createElement('p');
    newLoadingMessage.innerHTML = "Waiting for confirmation ...";
    PopUpWindowEl.appendChild(newLoadingMessage);
    socket.emit('tradeNumber', { roomID, username1, username2 });
})
//No
tradeButtonNoEl.addEventListener('click', (e)=> {
    overlayEl.style.display = "none";
    console.log("NOOO")
})
// Close pop up
closePopUpButton.addEventListener('click', (e)=> {
    overlayEl.style.display = "none";

})

/**************** REQUEST TRADE WINDOW  ****************/
const overlayResEl = document.getElementById("overlayRes");
const PopUpWindowResEl = document.querySelector('.popUpWindowRes');
const closePopUpButtonResEl = document.querySelector('.popupCloseButtonRes');
const tradeButtonYesResEl = document.getElementById('tradeButtonYesRes');
const tradeButtonNoResEl = document.getElementById('tradeButtonNoRes');

// Yes
tradeButtonYesResEl.addEventListener('click', (e)=> {
    window.location.href = "/success/" + user2.groupNumber;
    socket.emit('approvedTrade', { roomID, username1, username2 });
})
//No
tradeButtonNoResEl.addEventListener('click', (e)=> {
    overlayEl.style.display = "none";
    socket.emit('disapprovedTrade', { roomID, username1, username2 });
    console.log("NOOO")
})
// Confirm process activate pop up
socket.on('confirmTradeProcess', ({ roomID, username1, username2 }) => {
    overlayResEl.style.display = "block";
    console.log("User ", username1 , " wants to trade numbers with you.");
});
// Returned approved response for number trade
socket.on('approvedTradeToUser', ({ roomID, username1, username2 }) => {
    window.location.href = "/success/" + user2.groupNumber;
    console.log(username1 , " wants to trade numbers with you.");
});
// Returned rejection response for number trade
socket.on('disapprovedTradeToUser', ({ roomID, username1, username2 }) => {
    window.location.href = "/rejection";
});
// Close pop up
closePopUpButtonResEl.addEventListener('click', (e)=> {
    overlayResEl.style.display = "none";

})