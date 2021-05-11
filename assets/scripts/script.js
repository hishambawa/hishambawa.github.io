let player, day;

class Player
{
    constructor(name,skills, money, energy)
    {
        this.name = name;
        this.skills = skills;
        this.money = money;
        this.energy = energy
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

    player = new Player("Test", skills, 100, 100);
    setDay(1);
}

function saveGame()
{
    sessionStorage.setItem("name",player.name);
    sessionStorage.setItem("skills", JSON.stringify(player.skills));
    sessionStorage.setItem("money", player.money);
    sessionStorage.setItem("energy", player.energy);
    sessionStorage.setItem("day", day);

    alert("Saved the game successfully");
}

function loadGame()
{
    let energy = sessionStorage.getItem("energy");
    let money = sessionStorage.getItem("money");

    player = new Player(sessionStorage.getItem("name"), JSON.parse(sessionStorage.getItem("skills")), money, energy);
    setEnergy(energy);
    setMoney(money);
    setDay(sessionStorage.getItem("day"));
    
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