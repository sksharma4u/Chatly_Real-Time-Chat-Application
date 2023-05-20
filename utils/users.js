const users = [];

function userJoin(id, username, room) {
    const user = { id, username, room }

    users.push(user);
    return users;
}
//get current user

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}


//user leaves chat 

function userLeaves(id) {
    const index = usersfindIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//get users in a particlular room

function getRoomUsers(room) {
    return users.filter((user) => user.room === room)
}


module.exports = {
    userJoin,
    userLeaves,
    getCurrentUser,
    getRoomUsers
}