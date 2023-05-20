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
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

socket.on('roomUsers', ({
    room,
    users
}) => {

    outputRoomName(room);
    outputUsers(users);
})

function outputRoomName(room) {
    console.log(room)
    console.log("I am in room");
    roomName.innerText = room;
}

function outputUsers(users) {
    usersList.innerHTML = "";

    users.map((user) => {
        const li = document.createElement('li')
        li.innerText = user.username;
        console.log(user.username)
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


document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm("Are you sure you want to leave the Room?");
    if (leaveRoom) {
        window.location = "../index.html";
    } else {}
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;
    msg = msg.trim(); //remove unnecessary spaces 

    if (!msg) {
        return false;
    }

    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})