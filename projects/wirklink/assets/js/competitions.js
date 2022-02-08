let COMPETITION_KEY = "wlc-w2";
let COMPETITION_DATE = "2021-11-05T23:59:00";

window.addEventListener("load", function(){
    //loadEntries();
});

document.addEventListener("click", function(e){
    if(e.target){
        switch(e.target.id){
            case "close-competition-form":
            case "competition-modal":
                competitionForm(0);
                break;
        }
    }
});

document.getElementById("competition-form-modal").addEventListener("submit", function(e){
    e.preventDefault();
    submitForm();
});

function flip(card) {
    var object1 = document.getElementById("flip1");

    if (object1.style.transform == "rotateY(180deg)") {
        object1.style.transform = "rotateY(0deg)";
    }
    else {
        object1.style.transform = "rotateY(180deg)";
    }
}

// Function to show the form on btn click
function competitionForm(action) {
    let modal =  document.getElementById("competition-modal");

    if(action == 1){
       modal.style.display = "block";
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");

    }
    else{
        modal.style.display = "none";
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

function submitForm() {
    let formData = 
    {
        answer: document.getElementById("competition-answer").value,
        name: document.getElementById("competition-name").value,
        email: document.getElementById("competition-email").value,
        competitionCode: "wlc"
    }

    $.ajax({
        type: "POST",
        url: API_URL + "competition/save",
        headers:
        {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(formData),
        success: function(response){

            if(response.status == 1) {
                $("#competition-success").css("display", "block");

                setTimeout(function(){
                    $("#competition-success").css("display", "none"); 
                    window.location.reload();
                }, 5000);
            }

            else if(response.status == 0){
                ERROR("Submission Limit Reached", false);
            }

            else{
                ERROR("Error", true);
            } 
        },
        error: function(){
            ERROR("An error occurred", true);
        }
    })
}

var countDownDate = new Date(COMPETITION_DATE).getTime();
var countdownfunction = setInterval(function () {

    // Getting todays date and time
    var now = new Date().getTime();

    // Finding the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("timer").innerHTML = "<i class='far fa-clock' style='padding-right: 5px;'></i>" +  days + "D " + hours + "H";

    if (distance < 0) {
        clearInterval(countdownfunction);
        document.getElementById("timer").innerHTML = "EXPIRED";

        document.getElementById("wlc1").disabled = true;
        document.getElementById("wlc1").style.display = "none";
    }
}, 1000);

function vote(competitionCode){

    if(localStorage.getItem("lastVoted") != COMPETITION_KEY){
        $.ajax({
            type: "POST",
            url: API_URL + "competition/vote/" + competitionCode,
            headers:
            {
                "Content-Type" : "application/json"
            },
            success: function(data){
                showVotes(data);
                localStorage.setItem("lastVoted", COMPETITION_KEY);
            },
            error: function(){
                ERROR("An error occurred", false);
            }
        });
    }
}

function loadEntries(){
    $.ajax({
        type: "GET",
        url: API_URL + "competition/get",
        success: function(data){

            // Load the number of entries
            if(data.count != 1)document.getElementById("wlc-count").innerText = data.count + " Entries";
            else document.getElementById("wlc-count").innerText = data.count + " Entry";

            // Load the competition entries in the voting section
            for(competition of data.competition){
                let vote = 
                el('div', {class: 'vote-entry can-hover', onclick: 'vote("'+competition.competitionCode +'")'}, [
                    el('span', {class: 'vote-name'}, [competition.answer]),
                    el('span', {class: 'vote-count', id: 'count-' + competition.competitionCode}, [competition.votes + " votes"]),
                    el('div', {class: 'vote-progress', id: competition.competitionCode}, [])                    
                ]);
                
                document.getElementById("votes").appendChild(vote);
            }

            // Prevent the same user from voting more than once
            if(localStorage.getItem("lastVoted") == COMPETITION_KEY){
                setTimeout(function(){showVotes(data)}, 100);
            }
        },
        error: function(){
            ERROR("An error occurred", false);
        }
    });
}

// Get the percentage of votes with the total votes
function sum(current, total){
    return Math.round((current / total) * 100);
}

function showVotes(data){
    let list = document.getElementsByClassName("vote-progress");
    let entries = document.getElementsByClassName("vote-entry");
    let count = document.getElementsByClassName("vote-count");

    // Show the progress
    for(let i = 0; i < list.length; i++){
        list[i].classList.add("vote-progress-loaded");
    }

    // Prevent background change from hovering
    for(let j = 0; j < entries.length; j++){
        entries[j].classList.remove("can-hover");
    }

    for(let k = 0; k < count.length; k++){
        count[k].classList.add("vote-count-active");
    }

    for(competition of data.competition){
        document.getElementById(competition.competitionCode).style.width = sum(competition.votes, data.votes) + "%";
        
        if(competition.votes != 1)document.getElementById("count-" + competition.competitionCode).innerText = competition.votes + " votes";
        else document.getElementById("count-" + competition.competitionCode).innerText = competition.votes + " vote";
    }
}