function getEnergy()
{
    return document.getElementById("energy-balance").innerText;
}

function getMoney()
{
    return document.getElementById("money-balance").innerText;
}

function setEnergy(value)
{
    player.energy = value;
    document.getElementById("energy-balance").innerText = value;
}

function setMoney(value)
{
    player.money = value;
    document.getElementById("money-balance").innerText = value;
}