const log = (data) => {
    const parent = document.querySelector('#boxMessages');
    const el = document.createElement('p');
    el.innerHTML = `${data.username}: ${data.message}`;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const nicknameSubmit = (sock) => (e) => {
    e.preventDefault();

    const modal = document.getElementById("myModal");
    const nickname = document.querySelector('#nickname-input');
    const nickName = nickname.value;
    nickname.value = '';

    sock.emit('change_username', {nickName: nickName});
    modal.style.display = "none";
    console.log(nickName);
};

const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();

    const input = document.querySelector('#inputChat');
    const text = input.value;
    input.value = '';


    sock.emit('new_message', {message: text});
};

const typing = (sock) => (e) => {
    sock.emit('typing');
};

(() => {

    const usersList = document.getElementById("containerGamePlayers");
    const socket = io();

    socket.on('new_message', (data) => {
        log(data);
        feedback.innerHTML = '<p><i></i></p>';
    });

    socket.on('get users', data => {
        let html = '';
        for(let i=0;i<data.length;i++){
            html += `<div class="player">
                        <div class="name">${data[i].username}</div>
                        <div class="score">Points: 0</div>
                    </div>`;
        }
        usersList.innerHTML = `${html}`;
        console.log('Get users')
    });

    let feedback = document.getElementById('feedback');
    socket.on('typing', (data) => {
        feedback.innerHTML = "<p><i>" + data.username + " is typing a message..." + "</i></p>";
    });

    document
        .querySelector('#formChat')
        .addEventListener('submit', onChatSubmitted(socket));

    document
        .querySelector('#formNick')
        .addEventListener('submit', nicknameSubmit(socket));

    document
        .querySelector('#inputChat')
        .addEventListener('keydown', typing(socket));

})();