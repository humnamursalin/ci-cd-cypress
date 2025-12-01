document.getElementById("change-text").onclick = () => {
    document.getElementById("main-title").innerText = "Heading Updated!";
};

document.getElementById("change-color").onclick = () => {
    document.getElementById("main-title").style.color = "blue";
};

document.getElementById("show-message").onclick = () => {
    document.getElementById("message-box").innerText = "Button clicked!";
};
