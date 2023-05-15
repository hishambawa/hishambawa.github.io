$(document).ready(function() {
    loadCategories();
});

const imgUrl = "/projects/wirklink/assets/images/categories/";

function loadCategories(){
    for(category of categories){
        
        let template =
        el('div', {class: 'category-tile'}, [
            el('a', {href: "category/" + category.url}, [
                el('img', {class: 'category-image', width: '100%', height: '150px', src: imgUrl + category.imgSrc, alt: category.title}, []),
                el('p', {}, [category.title])
            ])
        ]);
        document.getElementById("categories-tile").appendChild(template);
    }
}