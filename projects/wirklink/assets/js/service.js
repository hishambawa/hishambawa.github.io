window.addEventListener("load", function() {
    //loadService();
});

document.getElementById("request-form").addEventListener("submit", function(e){
    e.preventDefault();
    postRequest(this);
});

let imageIndex = 0;

function nextImage(){
    const images = document.getElementsByClassName("service-image");
    const dot = document.getElementsByClassName("dot");
    const imageLength = images.length - 1;
        
    images[imageIndex].classList.remove("image-active");
    dot[imageIndex].classList.remove("dot-active");

    if(imageIndex < imageLength)imageIndex++;
    else imageIndex = 0;

    images[imageIndex].classList.add("image-active");
    dot[imageIndex].classList.add("dot-active");
}

function previousImage(){
    const images = document.getElementsByClassName("service-image");
    const dot = document.getElementsByClassName("dot");
    const imageLength = images.length - 1;

    images[imageIndex].classList.remove("image-active");
    dot[imageIndex].classList.remove("dot-active");

    if(imageIndex >= imageLength)imageIndex--;
    else if(imageIndex == 0) imageIndex = imageLength;
    else imageIndex = 0;

    images[imageIndex].classList.add("image-active");
    dot[imageIndex].classList.add("dot-active");
}

// Show and hide the service request modal
function requestModal(action){
    if(action == 1){
        $("#request-modal").fadeIn(800);
        blurBackground(1);
        $("html").addClass("hide-scroll");
        $("body").addClass("hide-scroll");
    }
    else{
        $("#request-modal").fadeOut(800);
        blurBackground(0);
        $("html").removeClass("hide-scroll");
        $("body").removeClass("hide-scroll");
    }
}

document.addEventListener("click", function(e) {
    if(e.target){
        switch(e.target.id){
            case "request-modal":               // Close the request modal when cliking outside the modal
            case "close-modal-request":         // Close the request modal when clicking the X
            case "cancel-request-btn":          // Close the request modal when clicking cancel
                requestModal(0);
                break;
            case "request-quote-btn":           // Open the request modal when clicking the request quote button
                requestModal(1);
                break;
        }
    }
});

let adId = new URL(document.location).searchParams.get("ad")

function loadService() {
    $.ajax({
        type:"GET",
        url:API_URL + "services/find/" + adId,
        success:function(response) {
            if(emptyField(response)){
                window.location.href = "catalog.html";
            }
            else{
                let imageUrl = response.coverImageUrl;

                if(response.imageUrl2 != null) imageUrl += ";" + response.imageUrl2;
                if(response.imageUrl3 != null) imageUrl += ";" + response.imageUrl3;

                let imageUrls = imageUrl.split(";");

                let imageContainer = document.getElementById("service-images");
    
                if(imageUrls.length == 1) {
                    document.getElementsByClassName("service-image-btn")[0].style.display = "none";
                    document.getElementsByClassName("service-image-btn")[1].style.display = "none";
                }
    
                for(var i = 0; i < imageUrls.length; i++){

                    let imgSrc = "https://api.wirklink.com/images/" + imageUrls[i]
                    let image = el('img', {src: imgSrc, alt: 'service image', class: 'service-image'}, []);
                    let dot = el('span', {class:'dot'}, []);
                    
                    imageContainer.appendChild(image);
                    document.getElementById("service-image-dots").appendChild(dot);
                }
    
                document.getElementsByClassName("service-image")[0].classList.add("image-active");
                document.getElementsByClassName("dot")[0].classList.add("dot-active");

                document.getElementById("service-provider-name").innerText = response.serviceProvider;

                let description = 
                    el('div', {id: 'service-description'}, [
                        el('h2', {}, [response.title]),
                        el('span', {style: 'white-space: pre-line'}, [response.description])
                    ]);

                let ratingPercent = Math.round(parseFloat(response.rating)/ 5 * 100);
                let ratingPercentRound = Math.round(ratingPercent/ 10) * 10;

                let rating = 
                    el('h3', {}, [
                        el('span', {class: 'stars-container stars-' + ratingPercentRound}, ['★★★★★']),
                        response.rating
                    ]);

                document.getElementById("service-content").appendChild(description);
                document.getElementById("service-provider").appendChild(rating);
            }
            
        },
        error:function(error) {
            ERROR("Error");
        }
    });
}

function postRequest(form){
    let formData = new FormData(form);

    if(form.checkValidity){
        $.ajax({
            type:"POST",
            url: API_URL + "requests/send/" + adId,
            data: formData,
            processData: false,
            contentType: false,
            success:function(response){
                if(response.status == 1) SUCCESS();
                else ERROR("Error");
            },
            error:function(error){
                ERROR("Error");          
            }
        });
    }
}