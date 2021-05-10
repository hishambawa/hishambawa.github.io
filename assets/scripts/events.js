document.addEventListener("keyup",events);

function events(keycode){
    switch(keycode.code){
        case "KeyS":
            saveGame();
            break;
        case "KeyL":
            loadGame();
            break;
        case "KeyG": 
            skillWindow();
            break;
        case "KeyX": // Test
            player.skills.speed++;
        default:
            break;
    }
}