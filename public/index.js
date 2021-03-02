//socket init
const socket = io();

let ta = document.querySelector('#msg');
let messageArea = document.querySelector('.message-area');
// User name accquiring
let name;
do {
    name = prompt('Enter your Name');
} while (!name)

// Enter key capture
ta.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if ((e.target.value).trim().length > 0) {
            sendMessage(e.target.value);
            ta.value = '';
        }
    }

});

// send message
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //append message
    appendMessage(msg, 'outgoing');

    // send to server
    socket.emit('message', msg);

}

// Append Message

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');

    mainDiv.classList.add(type, 'message');

    let markup = `
          <h4>${msg.user}</h4>
          <p>${msg.message}</p>
     `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    scrollToBottom();
}

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
//receive message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
})