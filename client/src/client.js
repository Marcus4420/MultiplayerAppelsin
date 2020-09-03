// Vi tager data og laver en ny paragraph meed username og message i data.
const log = (data) => {
    const parent = document.querySelector('#boxMessages');
    const el = document.createElement('p');
    el.innerHTML = `${data.username}: ${data.message}`;

    // vi tilføjer paragraphen til vores parent boxMessages.
    parent.appendChild(el);
    // Sørger for at chat vinduet følger med beskederne.
    parent.scrollTop = parent.scrollHeight;
};

// Når brugeren angiver sit username.
// Vi sikre os at feltet bliver tomt efter at brugereen submitter deres username.
// Vi sender username videre gennem WebSocket til serveren.
const nicknameSubmit = (sock) => (e) => {
    e.preventDefault();

    const modal = document.getElementById("myModal");
    const nickname = document.querySelector('#nickname-input');
    const nickName = nickname.value;
    nickname.value = '';

    sock.emit('change_username', {nickName: nickName});
    modal.style.display = "none";
};

// Når brugeren sender en besked i chatten.
// Vi stopper input feltet fra at genindlæse siden.
// vi sætter input feltet tilbage til at være tomt.
// Herefter sender vi beskeden gennem WebSocket til serveren.
const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();

    const input = document.querySelector('#inputChat');
    const text = input.value;
    input.value = '';


    sock.emit('new_message', {message: text});
};

// Når brugeren begynder at skrive i input feltet for chatten.
// Så beder vi serveren om at fortælle de andre brugere at denne bruger er i gang med at skrive.
const typing = (sock) => {
    sock.emit('typing');
};

// Bliver udløst når en bruger indlæser siden.
(() => {

    const usersList = document.getElementById("containerGamePlayers");
    const socket = io();

    // Når WebSocket modtager "new_message", så logger vi dataen og sætter feedback (typing) til intet.
    socket.on('new_message', (data) => {
        log(data);
        feedback.innerHTML = '<p><i></i></p>';
    });

    // Når WebSocket modtager "get users", så går vi igennem alle forbundne users og opdaterer spiller listen med de navne.
    socket.on('get users', data => {
        let html = '';
        for(let i=0;i<data.length;i++){
            html += `<div class="player">
                        <div class="name">${data[i].username}</div>
                        // Her skulle scoren være vist.
                        <div class="score">Points: 0</div>
                    </div>`;
        }
        usersList.innerHTML = `${html}`;
        console.log('Get users')
    });

    // Når "typing" bliver modtaget så fortæl de anmdre hvem der skriver.
    let feedback = document.getElementById('feedback');
    socket.on('typing', (data) => {
        feedback.innerHTML = "<p><i>" + data.username + " is typing a message..." + "</i></p>";
    });

    // Får fat på formchat og lyt efter "submit" og udløs.
    document
        .querySelector('#formChat')
        .addEventListener('submit', onChatSubmitted(socket));

    // Får fat på formNick og lyt efter "submit" og udløs.
    document
        .querySelector('#formNick')
        .addEventListener('submit', nicknameSubmit(socket));

    // Får fat på formchat og lyt efter "keydown" og udløs.
    document
        .querySelector('#inputChat')
        .addEventListener('keydown', typing(socket));

})();
