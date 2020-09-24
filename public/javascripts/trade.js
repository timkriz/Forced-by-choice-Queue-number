const socket = io();
var clients_queue_number = 0;
//var chat_peers = [];

socket.on('first_connection', message =>{
    console.log(message.username);
    clients_queue_number = message.username;
});

//Message from server
socket.on('all_groups', message => {
    console.log(message);
    outputMessage(message);
})
/*
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
})*/

// Output message to DOM
function outputMessage(message) {

    if (message.length < 1) {
        const listEl = document.createElement('a');
        listEl.classList.add('custom-list-item-a');
        listEl.setAttribute('style', "font-size: 2em")
        listEl.innerHTML = "There is no group queue numbers";
        document.getElementById('trade-number-list').appendChild(listEl);  
    }
    for (var i = 0; i< message.length; i++) {
        console.log(i + " number:  " + clients_queue_number);
        console.log(i + " message[i].username:  " + message[i].id);

        var existingEl = document.getElementById(message[i].id);
        if(existingEl || clients_queue_number == message[i].id) {
            continue
        }
        else {
            const listEl = document.createElement('a');
            listEl.classList.add('custom-list-item-a');
            
            listEl.setAttribute('id', message[i].id)
            listEl.setAttribute("href", "tradeingroup/"+ message[i].id);
            listEl.innerHTML = message[i].id;

            var container = document.getElementById('trade-number-list');
            if(i == 0) document.getElementById('trade-number-list').appendChild(listEl);
            else container.insertBefore(listEl, container.firstChild);
        }
    }
}