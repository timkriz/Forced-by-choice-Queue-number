const socket = io();
const numberDOMelement = document.getElementById('queueNumberh1');

socket.on('first_connection', message =>{
    console.log(message);
    numberDOMelement.innerHTML = message.username;
});

socket.on('message', message => {
    //outputMessage(message);
    console.log(message);
    document.getElementById("popup1").style.visibility = 'visible';
    document.getElementById("popup1").style.opacity = 1;
    //Scroll down
    //chatMessages.scrollTop = chatMessages.scrollHeight;
})