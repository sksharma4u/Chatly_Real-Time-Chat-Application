const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

socket.emit('joinRoom', {
    username,
    room
})


socket.on('message', (message) => {
    outputMessage(message);
})

socket.on('roomUsers', (room, users) => {
    outputRoomName(room);
    outputUsers(users);

})

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    usersList.innerHTML = "";

    users.forEach((user) => {
        const li = document.createElement('li')
        li.innerText = user.username;
        usersList.appendChild(li);
    })

}


function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span> ${message.time} </span>`
    div.appendChild(p);

    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);

    document.querySelector('.chat-messages').appendChild(div);
}