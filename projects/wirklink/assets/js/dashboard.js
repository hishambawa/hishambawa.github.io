let coverDeleted = false;

$(document).ready(function() {
    for(let i = 1; i < 4; i++){
        document.getElementById("image-" + i).addEventListener("change", function (e) {
            const file = e.target.files[0];
            if(file && file.size < 5000000){
                document.getElementById("image-"+ i +"-preview").src = URL.createObjectURL(file);
                document.getElementsByClassName("delete-image")[i-1].style.display = "block";
            }
            else{
                alert("File too large");
            }
        });

        document.getElementsByClassName("delete-image")[i-1].addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("image-" + i).value = "";

            if(i == 1) document.getElementById("image-"+ i +"-preview").src = "/projects/wirklink/assets/images/cover-image.png";
            else document.getElementById("image-"+ i +"-preview").src = "/projects/wirklink/assets/images/image-upload.png";
            document.getElementsByClassName("delete-image")[i-1].style.display = "none";
        }, false);
    }

    for(let i = 1; i < 4; i++){
        document.getElementById("edit-image-" + i).addEventListener("change", function (e) {
            const file = e.target.files[0];
            if(file && file.size < 5000000){
                document.getElementById("edit-image-"+ i +"-preview").src = URL.createObjectURL(file);
                document.getElementsByClassName("edit-delete")[i-1].style.display = "block";

                if(i == 1) coverDeleted = false;
            }
            else{
                alert("File too large");
            }
        });

        document.getElementsByClassName("edit-delete")[i-1].addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("edit-image-" + i).value = "";
            document.getElementById("edit-image-"+ i +"-preview").src = "/projects/wirklink/assets/images/image-upload.png";
            document.getElementsByClassName("edit-delete")[i-1].style.display = "none";

            if(i == 1) coverDeleted = true;

        }, false);
    }
});

window.addEventListener("load", function(){
    loadDetails();

    document.getElementById("post-ad-form").addEventListener("submit", function(e){
        e.preventDefault();
        postAd(this);
    });

    document.getElementById("edit-ad-form").addEventListener("submit", function(e){
        e.preventDefault();
        editAd(this, e.target.name);
    });

    // document.getElementById("ad-category").addEventListener("change", function(e){
    //     loadSubCategories(e.target.value);
    // });
});

document.addEventListener('click', function(e) {
    if(e.target){
        switch(e.target.id){
            case "post-ad-cancel":
                window.location.reload();
                break;
            case "post-ad-btn":
                postAdModal(1);  
                break;
            case "post-ad-modal":
            case "post-ad-close":
                postAdModal(0);
                break;

            case "close-modal-pending":
            case "pending-request-modal":
                pendingRequestModal(0);
                break;

            case "edit-ad-modal":
            case "edit-ad-close":
            case "edit-ad-cancel":
                editAdModal(0);
                break;

            case "delete-ad-submit":
                deleteAd(e.target.name);
                break;
            case "delete-ad-modal":
            case "close-modal-delete":
            case "delete-ad-cancel":
                deleteAdModal(0);
                break;
        }
    }
});

// Open and close the post ad modal
function postAdModal(action){
    if(action == 1){
        $("#post-ad-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");

        loadCategories();
    }
    else{
        $("#post-ad-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

// Open and close the edit ad modal
function editAdModal(action, id){
    if(action == 1){
        $("#edit-ad-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");

        loadAdDetails(id);
    }
    else{
        $("#edit-ad-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

function deleteAdModal(action, id){
    if(action == 1){
        $("#delete-ad-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");

        $("#delete-ad-submit").attr("name", id);
    }

    else{
        $("#delete-ad-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

// Open and close the pending request modal
function pendingRequestModal(action, id, type){
    if(action == 1){
        $("#pending-request-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");

        getDetails(id, type);
    }
    else{
        $("#pending-request-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

function postAd(form){
    let formData = new FormData(form);
    formData.append("subCategory", "x");

    if(document.getElementById("image-1").value != "" && form.checkValidity){
        $.ajax({
            type:"POST",
            url: API_URL + "services/post",
            data: formData,
            processData: false,
            contentType: false,
            headers:
            {
                "Authorization": TOKEN
            },
            success:function(response) {
                if(response.status == 1) SUCCESS();
                else ERROR ("Error");
            },
            error:function(error){
                $(".error-animation").css("display", "block");
                $("#error-message").text("Error");

                setTimeout(function(){
                    $(".error-animation").css("display", "none"); 
                    window.location.reload();
                }, 3000);
            }
        });
    }

    else{
        $(".error-animation").css("display", "block");
        $("#error-message").text("Select a cover image");

        setTimeout(function(){
            $(".error-animation").css("display", "none"); 
        }, 3000);
    }
}

function editAd(form, id){
    let formData = new FormData(form);

    if(!coverDeleted && form.checkValidity){
        $.ajax({
            type:"PUT",
            url: API_URL + "services/edit/" + id,
            data: formData,
            processData: false,
            contentType: false,
            headers:
            {
                "Authorization": TOKEN
            },
            success:function(response) {

                if(response.status == 1) SUCCESS();
                else ERROR("Error");
            },
            error:function(error){
                ERROR("Error");
            }
        });
    }

    else{
        $(".error-animation").css("display", "block");
        $("#error-message").text("Please select atleast one image");

        setTimeout(function(){
            $(".error-animation").css("display", "none"); 
        }, 3000);
    }
}

function loadDetails(){
    if(TOKEN != null){

        $.ajax({
            type:"GET",
            url: API_URL + "info",
            headers:
            {
                "Authorization": TOKEN
            },
            success:function(response) {
                document.getElementById("user-name").innerText = response.serviceProvider.name;

                if(response.verified == false || response.reviewed == false){
                    verifyUser(response.verified, response.reviewed);
                } 

                else {
                    loadPendingAds();
                    getCount();
                }
            },
            error:function(jqxhr) {
                if(jqxhr.status == 401) window.location.href = "index.html";
                else ERROR("Error");
            }
        });
    }

    else{
        window.location.href = "index.html";
    }
}

function loadCategories(){
    for(category of categories){
        let template = el('option', {value: category.value}, [category.title]);
        document.getElementById("ad-category").appendChild(template);
    }
}

function loadAds(){
    $(".dashboard-active").removeClass("dashboard-active");
    $("#my-services").addClass("dashboard-active");

    document.getElementById("services").innerHTML = "";

    $.ajax({
        type:"GET",
        url: API_URL + "services/get",
        headers:
        {
            "Authorization": TOKEN
        },
        success:function(response) {

            for(const ad of response){
                let adTemplate = 
                    el('div', {class:'dashboard-card', id: ad.advertisementId}, [
                        el('h2', {}, [ad.title]),
                        el('button', {class:'edit-btn dashboard-buttons', id: 'edit-ad-btn', onclick: 'editAdModal(1, "'+ ad.advertisementId +'")'}, ['Edit']),
                        el('button', {class:'delete-btn dashboard-buttons', onclick: 'deleteAdModal(1, "'+ ad.advertisementId +'")'}, ['Delete'])
                    ]);

                document.getElementById("services").appendChild(adTemplate);
            }                
        },
        error:function(error) {
            ERROR("Error");
        }
    });
}

function loadPendingAds(){

    $(".dashboard-active").removeClass("dashboard-active");
    $("#pending-requests-container").addClass("dashboard-active");

    document.getElementById("pending-requests").innerHTML = "";

    $.ajax({
        type: "GET",
        url: API_URL + "requests/get",
        headers:
        {
            "Authorization": TOKEN
        },
        success:function(response){

           for(request of response){
                let pendingRequest =
                    el('div', {class: 'dashboard-card'}, [
                        el('h2', {}, [request.title]),
                        el('span', {}, ['Location: ' + request.location]),
                        el('button', {class: 'more-btn dashboard-buttons', onclick:'pendingRequestModal(1, "'+ request.id +'", "request")'}, ['More Info'])
                    ]);

                document.getElementById("pending-requests").appendChild(pendingRequest);
           }
        },
        error: function(error){
            ERROR("Error");
        }
    });
}

function setStatus(id, statusValue, type){
    let statusData = 
    {
        status: statusValue,
        customerRequestId: id
    };

    $.ajax({
        type: "PUT",
        url: API_URL + "requests/" + type,
        headers:
        {
            "Authorization" : TOKEN,
            "Content-Type" : "application/json"
        },
        data: JSON.stringify(statusData),
        success: function(response){
            if(response.status == 1) SUCCESS();
            else ERROR("Error");
        },
        error: function(){
            ERROR("Error");
        }
    });
}

function loadOngoingAds(){
    $(".dashboard-active").removeClass("dashboard-active");
    $("#ongoing-jobs-container").addClass("dashboard-active");

    document.getElementById("ongoing-jobs").innerHTML = "";

    $.ajax({
        type: "GET",
        url: API_URL + "requests/get/ongoing",
        headers:
        {
            "Authorization": TOKEN
        },
        success:function(response){
           for(request of response){
                let ongoingJobs =
                    el('div', {class: 'dashboard-card'}, [
                        el('h2', {}, [request.title]),
                        el('span', {}, ['Location: ' + request.location]),
                        el('button', {class: 'more-btn dashboard-buttons', onclick:'pendingRequestModal(1, "'+ request.id +'", "ongoing")'}, ['More Info'])
                    ]);

                document.getElementById("ongoing-jobs").appendChild(ongoingJobs);
           }
        },
        error: function(error){
            ERROR("Error");
        }
    })
}

// Get the details of the pending ad or ongoing job.
function getDetails(id, type){
    document.getElementById("pending-request-details-container").innerHTML = "";

    $.ajax({
        type: "GET",
        url: API_URL + "requests/get/" + id,
        headers:
        {
            "Authorization": TOKEN
        },
        success: function(response){
            if(type == "request"){
                let details = 
                    el('div', {id: 'pending-request-details'}, [
                        el('h4', {}, ['Advertisement: ' + response.title]),
                        el('h4', {}, ['Customer Name: ' + response.name]),
                        el('h4', {}, ['Email: ' + response.email]),
                        el('h4', {}, ['Contact Number: ' + response.contactNumber]),
                        el('h4', {}, ['Location: ' + response.location]),
                        el('h4', {}, ['Description: ' + response.description]),

                        el('div', {class: 'pending-request-buttons'}, [
                            el('button', {class: 'dashboard-buttons', onclick: 'setStatus("'+ response.id +'", 1, "status")'}, ['Accept']),
                            el('button', {class: 'dashboard-buttons', onclick: 'setStatus("'+ response.id +'", 0, "status")'}, ['Reject'])
                        ])
                    ]);

                document.getElementById("modal-title").innerText = "Pending Request";
                document.getElementById("pending-request-details-container").appendChild(details);
            }

            else if(type == "ongoing"){
                let details = 
                    el('div', {id: 'pending-request-details'}, [
                        el('h4', {}, ['Advertisement: ' + response.title]),
                        el('h4', {}, ['Customer Name: ' + response.name]),
                        el('h4', {}, ['Email: ' + response.email]),
                        el('h4', {}, ['Contact Number: ' + response.contactNumber]),
                        el('h4', {}, ['Location: ' + response.location]),
                        el('h4', {}, ['Description: ' + response.description]),

                        el('div', {class: 'pending-request-buttons'}, [
                            el('button', {class: 'dashboard-buttons', onclick: 'setStatus("'+ response.id +'", 1, "complete")'}, ['Finish Job']),
                            el('button', {class: 'dashboard-buttons', onclick: 'setStatus("'+ response.id +'", 0, "complete")'}, ['Cancel Job'])
                        ])
                    ]);

                document.getElementById("modal-title").innerText = "Ongoing Job";
                document.getElementById("pending-request-details-container").appendChild(details);
            }

        },
        error: function(error){
            ERROR("Error");
        }
    });
}

function loadAdDetails(id){
    for(let i = 1; i < 4; i++) document.getElementById("edit-image-" + i + "-preview").src = "/projects/wirklink/assets/images/image-upload.png";

    $.ajax({
        type:"GET",
        url:API_URL + "services/find/" + id,
        success:function(response) {
            document.getElementById("edit-ad-form").name = id;
            document.getElementById("edit-ad-title").value = response.title;
            document.getElementById("edit-ad-description").value = response.description;

            document.getElementById("edit-image-1-preview").src = "https://api.wirklink.com/images/" + response.coverImageUrl;
            if(response.imageUrl2 != null) document.getElementById("edit-image-2-preview").src = "https://api.wirklink.com/images/" + response.imageUrl2;
            if(response.imageUrl3 != null)document.getElementById("edit-image-3-preview").src = "https://api.wirklink.com/images/" + response.imageUrl3;
        },
        error:function(error) {
            ERROR("Error");
        }
    });
}

function deleteAd(id){
    $.ajax({
        type: "DELETE",
        url: API_URL + "services/delete/" + id,
        headers:
        {
            "Authorization": TOKEN
        },
        success: function(response){
            deleteAdModal(0);
            
            if(response.status == 1) SUCCESS();
            else ERROR("Error");
        },
        error: function(error){
            ERROR("Error");
        }
    })
}

function verifyUser(verified, reviewed){
    $("#content").addClass("modal-active");

    if(!verified){
        document.getElementById("review-modal-title").innerText = "We have sent you an email. \n Please verify it";
    } 
    else if(!reviewed) {
        document.getElementById("review-modal-title").innerText = "Account under review";
        document.getElementById("review-modal-image").src = "/projects/wirklink/assets/images/account-review.jpg";
    }

    $("#review-modal-content").show();
}

function getCount(){

    $.ajax({
        type: "GET",
        url: API_URL + "requests/get/count",
        headers:
        {
            "Authorization": TOKEN
        },
        success: function(response){
            if(response.pending > 0) document.getElementById("pending-request-count").innerText = response.pending;
            if(response.ongoing > 0) document.getElementById("ongoing-request-count").innerText = response.ongoing;
        },
        error: function(){
            ERROR("Error", true);
        }
    })
}