document.getElementById("contact-form-container").addEventListener("submit", function(e){
    e.preventDefault();
    sendMessage(this);
});

function sendMessage(form){
    let formData = 
    {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        email: form.email.value,
        number: form.number.value,
        subject: form.subject.value,
        message: form.message.value
    }

    if(form.checkValidity()){
        $.ajax({
            type: "POST",
            url: API_URL + "contact",
            headers:
            {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(formData),
            success: function(response){
                if(response.status == 1){
                    $(".success-animation").css("display", "block");
    
                    setTimeout(function(){
                        $(".success-animation").css("display", "none"); 
                        window.location.href = "index.html";
                    }, 3000);
                }
    
                else{
                    $("#error-message").text("An error occurred. Please try again later.");
                    $(".error-animation").css("display", "block");
    
                    setTimeout(function(){
                        $(".error-animation").css("display", "none"); 
                    }, 3000);
                }
            },
            error: function(error){
                $("#error-message").text("An error occurred. Please try again later.");
                $(".error-animation").css("display", "block");
    
                setTimeout(function(){
                    $(".error-animation").css("display", "none"); 
                }, 3000);
            }
        });
    }
}