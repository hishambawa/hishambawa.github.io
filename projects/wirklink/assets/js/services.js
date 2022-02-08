$(document).ready(function(){
    loadSidebar();
});

function loadServices(category){
    let content = document.getElementById("content");
   
    $.ajax({
        type:"GET",
        url: API_URL + "services/find/type/" + category,
        success:function(response) {
            if(response.length > 0) document.getElementById("services-empty").style.display = "none";

            for(ad of response){
                let imgUrl = "https://api.wirklink.com/images/" + ad.coverImageUrl;

                let serviceTemplate =
                    el('a', {class:'service-card-container', id: ad.id, href:'/service.html?ad=' + ad.id, target:'_blank'}, [
                        el('div', {class:'service-card'}, [
                            el('img', {src:imgUrl, alt:'service-logo'},[]),
                            el('div', {class:'service-description'}, [
                                el('h2', {}, [ad.title]),
                                el('hr', {}, []),
                                el('div', {class:'details', style:'padding: 10px; overflow: auto;'}, [
                                    el('span', {style:'float:left'}, [ad.serviceProvider]),
                                    el('span', {style:'float:right;'}, ["★" + ad.rating])
                                ])
                            ])
                        ])
                    ]);

                content.appendChild(serviceTemplate);
            }
        },
        error:function(error) {
            ERROR("An error occurred", true);
        }
    });
}

function loadSidebar(){
    for(category of categories){

        let categories =
            el('li', {class: 'category'}, [
                el('a', {href: '/category/' + category.url}, [category.title])
            ]);

        document.getElementById("categories").appendChild(categories);
    }
}

function showSidebar(action){
    if(action == 1){
        $("body").addClass("hide-scroll");
        $("#category-container").css("display", "block");
        $("#category-container-body").css("display", "block");
    }

    else{
        $("body").removeClass("hide-scroll");
        $("#category-container").css("display", "none");
        $("#category-container-body").css("display", "none");
    }
}