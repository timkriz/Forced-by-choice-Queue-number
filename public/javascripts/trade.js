const socket = io();
var clients_queue_number = 0;
//var chat_peers = [];

socket.on('first_connection', message =>{
    console.log(message.username);
    clients_queue_number = message.username;
});

//Message from server
socket.on('all_clients', message => {
    outputMessage(message);
})

socket.on('ChatPeers', chat_peers => {
    console.log(chat_peers);
    for (var i=0; i<chat_peers.length; i++){
        var el = document.getElementById(chat_peers[i]);
        const chatting = document.createElement('p');
        chatting.setAttribute('style', "display: inline-block;margin-left: 30px; color: lightgray;")
        chatting.innerHTML = "new messages";
        el.appendChild(chatting);
    }
    //chat_peers = message;
})

// Output message to DOM
function outputMessage(message) {

    if (message.length < 2) {
        const listEl = document.createElement('a');
        listEl.classList.add('custom-list-item-a');
        listEl.setAttribute('style', "font-size: 2em")
        listEl.innerHTML = "There is no one around";
        document.getElementById('trade-number-list').appendChild(listEl);  
    }
    for (var i = 0; i<message.length; i++) {
        console.log(i + " number:  " + clients_queue_number);
        console.log(i + " message[i].username:  " + message[i].username);
        if (clients_queue_number == message[i].username) {
            continue
        } 
        const listEl = document.createElement('a');
        listEl.classList.add('custom-list-item-a');
        
        listEl.setAttribute('id', message[i].username)
        listEl.setAttribute("href", "chat/"+ clients_queue_number + '/' + message[i].username);
        listEl.innerHTML = message[i].username;

        /*// CHATTING
        const chatting = document.createElement('p');
        chatting.innerHTML = "chatting";
        console.log(String(message[i].username));
        console.log("chat_peers: ", chat_peers)
        if(chat_peers.includes(String(message[i].username))){
            listEl.appendChild(chatting);
        }*/

        var container = document.getElementById('trade-number-list');
        if(i == 0) document.getElementById('trade-number-list').appendChild(listEl);
        else container.insertBefore(listEl, container.firstChild);
    }
}