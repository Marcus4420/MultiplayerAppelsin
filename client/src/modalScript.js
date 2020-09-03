// Get the modal
var modal = document.getElementById("myModal");
const nicknameInput = document.getElementById("nickname-input");

// Close modal when nick-name is typed
nicknameInput.onkeypress = e => {
    if(e.key === 'Enter'){
        modal.style.display = "none";
    }
};