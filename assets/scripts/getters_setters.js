function getEnergy()
{
    return parseInt(document.getElementById("energy").innerText);
}

function getMoney()
{
    return parseInt(document.getElementById("money").innerText);
}

function getDay()
{
    return parseInt(document.getElementById("day").innerText);
}

function setEnergy(value)
{
    player.energy = value;
    document.getElementById("energy").innerText = value;
}

function setMoney(value)
{
    player.money = value;
    document.getElementById("money").innerText = value;
}

function setDay(value)
{
    day = value;
    document.getElementById("day").innerText = value;
}