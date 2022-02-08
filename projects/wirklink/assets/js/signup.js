let validationMap =
{
    name: false,
    id: false,
    email: false,
    number: false,
    address1: false,
    address2: false,
    city: false,
    website: true,
    password: false,
    passwordRepeat: false
}

function signup(){
    let complete = validateAll();

    for(key in validationMap){
        if(validationMap[key] == false) {
            complete = false;
            validationMessage(key);
            break;
        }
    }

    if(valid && complete){
        $("#signup-btn").prop("disabled", true);

        let website;

        if(document.getElementById("website").value == "") website = null;
        else website = document.getElementById("website").value;

        let data =
        {
            name : document.getElementById("name").value,
            idNumber : document.getElementById("reg-id").value,
            email : document.getElementById("email").value,
            contactNumber : document.getElementById("number").value,
            address1 : document.getElementById("address1").value,
            address2 : document.getElementById("address2").value,
            location : document.getElementById("city").value,
            website : website,
            password : document.getElementById("password").value,
            role: TYPE,
            type: CATEGORY
        };

        $.ajax({
            type:"POST",
            url: API_URL + "register",
            headers:
            {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success:function(response){
                $("#signup-btn").prop("disabled", false);

                if(response.status == 1){
                    signupModal(0);
                    $(".success-animation").css("display", "block");

                    setTimeout(function(){
                        $(".success-animation").css("display", "none"); 

                        const token = "Bearer " + response.message;                    
                        localStorage.setItem("token", token);
                        window.location.href = "/dashboard.html";
                    }, 3000);
                }

                else if (response.status == 0){
                    signupModal(0);
                    $("#error-message").text("Email is already in use");
                    $(".error-animation").css("display", "block");

                    setTimeout(function(){
                        $(".error-animation").css("display", "none"); 
                        signupModal(1);
                    }, 3000);
                }

                else{
                    signupModal(0);
                    $("#error-message").text("An error occurred. Please try again");
                    $(".error-animation").css("display", "block");
                    
                    setTimeout(function(){
                        $(".error-animation").css("display", "none"); 
                    }, 3000);
                }
            },
            error:function(error){
                signupModal(0);
                $("#error-message").text("An error occurred. Please try again");
                $(".error-animation").css("display", "block");
                
                setTimeout(function(){
                    $(".error-animation").css("display", "none"); 
                }, 3000);
            }
        });
    }

    else{
        document.getElementById("signup-error").style.display = "flex";
    }
}

var valid = false;
function validate(field){

    let name = document.getElementById("name");
    let id = document.getElementById("reg-id");
    let email = document.getElementById("email");
    let number = document.getElementById("number");
    let address1 = document.getElementById("address1");
    let address2 = document.getElementById("address2");
    let city = document.getElementById("city");
    let website = document.getElementById("website");
    let password = document.getElementById("password");
    let passwordRepeat = document.getElementById("password-repeat");

    switch(field){
        case "name":
            if(CATEGORY == "individual") {
                if(emptyField(name.value) || emptyField(name.value.split(" ")[1])){
                    name.style.border = "1px solid #ff0f0f";
                    error(1, "Enter the Full Name", "name");
                    validationMap.name = false;
                }
                else{
                    name.style.border = "1px solid #4BB543";
                    error(0, null, "name");
                    validationMap.name = true;
                } 
            }

            else if(CATEGORY == "company"){
                if(emptyField(name.value)){
                    name.style.border = "1px solid #ff0f0f";
                    error(1, "Enter a valid Name");
                    validationMap.name = false;
                }
    
                else{
                    name.style.border = "1px solid #4BB543";
                    error(0);
                    validationMap.name = true;
                } 
            }

            break;

        case "id":
            if(emptyField(id.value)){
                id.style.border = "1px solid #ff0f0f";
                error(1, "Enter the ID");
                validationMap.id = false;
            } 
            else{
                id.style.border = "1px solid #4BB543";
                error(0);
                validationMap.id = true;
            } 
            break;

        case "email":
            if(emptyField(email.value) ||(email.value.indexOf("@") < 1) || (email.value.indexOf(".") == email.value.length-1 || email.value.indexOf(".") < 1)) {
                email.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid Email");
                validationMap.email = false;
            }

            else{
                email.style.border = "1px solid #4BB543";
                error(0);
                validationMap.email = true;
            }
            break;

        case "number":
            if(isNaN(number.value) || emptyField(number.value) || number.value.length != 10){
                number.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid Contact Number");
                validationMap.number = false;
            }

            else{
                number.style.border = "1px solid #4BB543";
                validationMap.number = true;
                error(0);
            }
            break;

        case "address1":
            if(emptyField(address1.value)){
                address1.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid Address");
                validationMap.address1 = false;
            } 
            else{
                address1.style.border = "1px solid #4BB543";
                error(0);
                validationMap.address1 = true;
            }
            break;

        case "address2":
            if(emptyField(address2.value)){
                address2.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid Address");
                validationMap.address2 = false;
            } 
            else {
                address2.style.border = "1px solid #4BB543";
                error(0);
                validationMap.address2 = true;
            }
            break;

        case "city":
            if(emptyField(city.value)){
                city.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid City");
                validationMap.city = false;
            } 
            else {
                city.style.border = "1px solid #4BB543";
                error(0);
                validationMap.city = true;
            }
            break;

        case "website":
            if(!emptyField(website.value) && (website.value.split("www.")[1] == null || website.value.split(".").length < 3)){
                website.style.border = "1px solid #ff0f0f";
                error(1, "Enter a valid Website");
                validationMap.website = false;
            } 
            else{
                website.style.border = "1px solid #4BB543";
                error(0);
                validationMap.website = true;
            }
            break;

        case "password":
            if(emptyField(password.value)){
                password.style.border = "1px solid #ff0f0f";
                error(1, "Please enter a valid password");
                validationMap.password = false;
            } 

            else{
                password.style.border = "1px solid #4BB543";
                validationMap.password = true;

                if(password.value != passwordRepeat.value){
                    passwordRepeat.style.border = "1px solid #ff0f0f";
                    error(1, "Passwords don't match");
                    validationMap.passwordRepeat = false;
                }
    
                else{
                    passwordRepeat.style.border = "1px solid #4BB543";
                    validationMap.passwordRepeat = true;
                    error(0);
                }
            }
            break;

        case "passwordRepeat":
            if(emptyField(passwordRepeat.value)){
                passwordRepeat.style.border = "1px solid #ff0f0f";
                error(1, "Please enter the password again");
                validationMap.passwordRepeat = false;
            }
            
            else if(passwordRepeat.value != password.value){
                passwordRepeat.style.border = "1px solid #ff0f0f";
                error(1, "Passwords don't match");
                validationMap.passwordRepeat = false;
            } 

            else{
                passwordRepeat.style.border = "1px solid #4BB543";
                error(0);
                validationMap.passwordRepeat = true;
            }
            break;
    }
}

var CATEGORY;
var TYPE;

function showUserCategories(type) {
    TYPE = type;

    document.getElementById("user-type").style.display = "none";
    $("#user-category").fadeIn(1000);
}

function showFields(category){
    CATEGORY = category;

    document.getElementById('user-category').style.display = "none";
    document.getElementById("signup-btn").style.display = "block";

    let name = document.getElementById("name-field");
    let nameInput = document.getElementById("name");
    let id = document.getElementById("id-field");
    let idInput = document.getElementById("reg-id");

    if(category == "individual"){
        name.innerText = "Full Name";
        nameInput.placeholder = "Enter your Full Name";
        id.innerText = "NIC Number";
        idInput.placeholder = "Enter your NIC Number";
    }

    else{
        name.innerText = "Company Name";
        nameInput.placeholder = "Enter the Company Name";
        id.innerText = "Company Registration Number";
        idInput.placeholder = "Enter the Registration Number";
    }

    if(!emptyField(nameInput.value)) validate("name");

    $(".user-details").fadeIn(1000);

}

function error(action, message){
    let errorContainer = document.getElementById("signup-error");
    let error = document.getElementById("signup-error-message");

    if(action == 1){
        error.innerText = message;
        valid = false;
    }

    else{
        errorContainer.style.display = "none";
        valid = true;
    }
}

function validateAll(){
    let fields = document.getElementsByClassName("required-field");

    for(let i = 0; i < fields.length; i++){

        if(emptyField(fields[i].value)){
            error(1, "Please fill all the fields");
            return false;
        } 
    }

    return true;
}

function resetFields(){
    let fields = document.getElementsByClassName("required-field");

    for(let i = 0; i < fields.length; i++){
        fields[i].value = "";
        fields[i].style.border = "1px solid #ccc";
    }

    document.getElementById("website").value = "";
}

function validationMessage(key){

    let error = document.getElementById("signup-error-message");

    switch(key){
        case "name":
            error.innerText = "Enter a valid Name";
            break;
        case "id":
            error.innerText = "Enter a valid ID";
            break;
        case "email":
            error.innerText = "Enter a valid Email";
            break;
        case "number":
            error.innerText = "Enter a valid Number";
            break;
        case "address1":
        case "address2":
            error.innerText = "Enter a valid Address";
            break;
        case "city":
            error.innerText = "Enter a valid City";
            break;
        case "Website": 
            error.innerText = "Enter a valid Website";
            break;
        case "password":
            error.innerText = "Enter a valid Password";
            break;
        case "passwordRepeat":
            error.innerText = "Passwords dont match";
            break;
    }
}