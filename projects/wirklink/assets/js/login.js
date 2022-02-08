function login(){
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if(emptyField(email)){
        $("#login-error-message").text("Enter your Email");
        $("#login-error").css("display", "flex");
    }

    else if(emptyField(password)){
        $("#login-error-message").text("Enter your Password");
        $("#login-error").css("display", "flex");
    }

    else{
        $("#login-btn").prop("disabled", true);

        let data =
        {
            email : email,
            password : password,
        };

        $.ajax({
            type:"POST",
            url: API_URL + "login",
            headers:
            {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success:function(response){
                $("#login-btn").prop("disabled", false);

                if(response.status == 1){

                    const token = "Bearer " + response.message;                    
                    localStorage.setItem("token", token);
            
                    window.location.href = "/dashboard.html";
                } 

                else if (response.status == 0){
                    $("#login-error-message").text("Invalid Email or Password");
                    $("#login-error").css("display", "flex");
                }

                else{
                    loginModal(0);
                    $("#error-message").text("An error occurred. Please try again");
                    $(".error-animation").css("display", "block");

                    setTimeout(function(){
                        $(".error-animation").css("display", "none"); 
                    }, 3000);
                }
            },
            error:function(error){
                loginModal(0);

                $("#error-message").text("An error occurred. Please try again");
                $(".error-animation").css("display", "block");
                $("#login-btn").prop("disabled", false);

                setTimeout(function(){
                    $(".error-animation").css("display", "none"); 
                }, 3000);
            }
        });
    }
}

function logout(){
    localStorage.removeItem("token");
    window.location.reload();
}

function togglePassword(id, type){
    let password = document.getElementById(id);
    let passwordIcon = document.getElementById(type + "-password-icon");

    if(password.type == "password"){
        password.type = "text";

        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    }

    else{
        password.type = "password";

        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }
}

function sendPasswordReset(){

    let email = document.getElementById("forgot-email").value;
    let data =
    {
        email: email
    }

    if(!emptyField(email)){
        $.ajax({
            type: "POST",
            url: API_URL + "reset/send",
            headers:
            {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            success: function(response){
                
                if(response.status == 1) SUCCESS();
                else ERROR("User not found", false);
            },
            error: function(error){
                ERROR("Error");
            }
        });
    }
}