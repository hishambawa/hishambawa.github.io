function train()
{
    if(getEnergy() >= 20)
    {
        player.skills.strength++;
        setEnergy(getEnergy()-20);
    }

    else
    {
        alert("No Energy");
    } 
}

function sleep()
{
    setEnergy(100);
    setDay(getDay() + 1);
}