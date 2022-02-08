window.addEventListener("load", function(){
    loadData();
});

function loadData(){
    if(TOKEN == null){
        location.href = "index.html";
        loginModal(1);
    }

    else{
        $.ajax({
            type:"GET",
            url: API_URL + "info",
            headers:
            {
                "Authorization": TOKEN
            },
            success:function(response) {
                document.getElementById("edit-name").value = response.serviceProvider.name;
                document.getElementById("edit-email").value = response.email;
                document.getElementById("edit-number").value = response.serviceProvider.contactNumber;
                document.getElementById("edit-address1").value = response.serviceProvider.address1;
                document.getElementById("edit-address2").value = response.serviceProvider.address2;
                document.getElementById("edit-city").value = response.serviceProvider.location;
                document.getElementById("edit-website").value = response.serviceProvider.website;
            },
            error:function(xhr) {
                ERROR("Error");
            }
        });
    }
}

function editProfile(){
    let websiteValue = document.getElementById("edit-website").value;
    let passwordValue = document.getElementById("edit-password").value;

    if(emptyField(websiteValue)) websiteValue = null;
    if(emptyField(passwordValue)) passwordValue = null;

    let userData = 
    {
        contactNumber: document.getElementById("edit-number").value,
        address1: document.getElementById("edit-address1").value,
        address2: document.getElementById("edit-address2").value,
        location: document.getElementById("edit-city").value,
        website: websiteValue,
        password: passwordValue
    };

    if(valid){
        $.ajax({
            type:"PUT",
            url: API_URL + "edit",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": TOKEN
            },
            data: JSON.stringify(userData),
            success: function(response){
                if(response.status == 1){
                    $(".success-animation").css("display", "block");
                    setTimeout(function(){
                        $(".success-animation").css("display", "none"); 
                        logout();
                    }, 3000);
                }
                else{
                    ERROR("Error");
                }
            },
            error:function(error){
                ERROR("An error occurred");
            }
        });
    }
}

document.getElementById("edit-save-btn").onclick = editProfile;
document.getElementById("edit-cancel-btn").onclick = function(){window.location.href = "dashboard.html";};

var valid = true;
var message = null;

function validate(field, type){
    let passwordRepeat = document.getElementById("edit-password-repeat");

    switch(type){

        case "number":
            if(isNaN(field.value) || field.value.length != 10){
                field.style.border = "1px solid #ff0f0f";
                error(1, "Please enter a valid Contact Number");
            }

            else{
                field.style.border = "1px solid #4BB543";
                error(0);
            }

            break;

        case "address1":
            if(emptyField(field.value)) {
                field.style.border = "1px solid #ff0f0f";
                error(1, "Address cannot be blank");
            }

            else {
                field.style.border = "1px solid #4BB543";
                error(0);
            }

            break;

        case "address2":
            if(emptyField(field.value)) {
                field.style.border = "1px solid #ff0f0f";
                error(1, "Address cannot be blank");
            }

            else {
                field.style.border = "1px solid #4BB543";
                error(0);
            }

            break;

        case "city":
            if(emptyField(field.value)){
                field.style.border = "1px solid #ff0f0f";
                error(1, "City cannot be blank");
            } 

            else {
                field.style.border = "1px solid #4BB543";
                error(0);
            }

            break;

        case "website":
            if(field.value != "" && (field.value.split("www.")[1] == null || field.value.split(".").length < 3)){
                field.style.border = "1px solid #ff0f0f";
                error(1, "Please enter a valid Website");
            } 
            else{
                field.style.border = "1px solid #4BB543";
                error(0);
            }
            break;

        case "password":
            if(field.value == " "){
                field.style.border = "1px solid #ff0f0f";
                error(1, "Please enter a valid password");
            } 

            else{
                field.style.border = "1px solid #4BB543";

                if(field.value != passwordRepeat.value){
                    passwordRepeat.style.border = "1px solid #ff0f0f";
                    error(1, "Passwords don't match");
                }
    
                else{
                    passwordRepeat.style.border = "1px solid #4BB543";
                    error(0);
                }
            }
            break;

        case "passwordRepeat":
            if(emptyField(field.value)){
                field.style.border = "1px solid #ff0f0f";
                error(1, "Please enter the password again");
            }
            
            else if(field.value != document.getElementById("edit-password").value){
                field.style.border = "1px solid #ff0f0f";
                error(1, "Passwords don't match");
            } 

            else{
                field.style.border = "1px solid #4BB543";
                error(0);
            }

            break;
    }
}

function error(action, message){
    let errorContainer = document.getElementById("error-container");
    let error = document.getElementById("error-text");

    if(action == 1){
        errorContainer.style.display = "flex";
        error.innerText = message;

        valid = false;
    }

    else{
        errorContainer.style.display = "none";
        valid = true;
    }
}