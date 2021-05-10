let player;

class Player
{
    constructor(name,skills)
    {
        this.name = name;
        this.skills = skills;
    }
}

function newGame()
{
    let skills = 
    {
        strength:0,
        speed:0,
        stamina:0,
        intelligence:0
    }

    player = new Player("Test", skills);
}

function saveGame()
{
    sessionStorage.setItem("name",player.name);
    sessionStorage.setItem("skills", JSON.stringify(player.skills));

    alert("Saved the game successfully");
}

function loadGame()
{
    player = new Player(sessionStorage.getItem("name"), JSON.parse(sessionStorage.getItem("skills")));
    
    alert("Loaded!");
}

function loadSkills()
{
    let strengthSkill = document.getElementById("strength");
    let speedSkill = document.getElementById("speed");
    let staminaSkill = document.getElementById("stamina");
    let intelligenceSkill = document.getElementById("intelligence");

    strengthSkill.innerText = player.skills.strength;
    speedSkill.innerText = player.skills.speed;
    staminaSkill.innerText = player.skills.stamina;
    intelligenceSkill.innerText = player.skills.intelligence;
}

function skillWindow()
{
    let skillWindow = document.getElementById("skill-window");

    loadSkills();

    if(skillWindow.style.display != "block") skillWindow.style.display = "block";
    else skillWindow.style.display = "none";
}

newGame();