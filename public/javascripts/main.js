const socket = io();
const numberDOMelement = document.getElementById('queueNumberh1');
const tradeButton = document.getElementById("trade_number_button");

socket.on('first_connection', message =>{
    console.log(message);
    stevilkaGrupe=message;
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

socket.on('unactive_group', message => {
    //outputMessage(message);
    console.log(message);
    
    if(message.grNum == message.clientsQnum){
        console.log('šlo v zanko')
        tradeButton.style.display = 'none';
    }
})

setInterval(function(){ 
    socket.emit('check_if_group_active', '0');
    socket.emit('check_if_group_active', '1');
    socket.emit('check_if_group_active', '2');
 }, 6000);

 socket.on('if_group_active', message => {
    //outputMessage(message);
    setInterval(function(){ 
        if(message.clientsNumber == '541' && message.numberIX == '0' && message.isActive == '0') tradeButton.style.display = 'none';
        if(message.clientsNumber == '356' && message.numberIX == '1' && message.isActive == '0') tradeButton.style.display = 'none';
        if(message.clientsNumber == '987' && message.numberIX == '2' && message.isActive == '0') tradeButton.style.display = 'none';
        console.log(message);
     }, 6000);
})
