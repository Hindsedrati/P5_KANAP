

let urlcourante = document.location.href;
let url = new URL(urlcourante);
let id = url.searchParams.get("id");
console.log(id);
let url_api = "http://localhost:3000/api/products/"+id

fetch(url_api)
.then(function (res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(product  ) {
    console.log(product);
    let id = product._id;
    let nom = product.name;
    let prix = product.price;
    let color = product.colors;
    let description = product.description;
    let altTxt = product.altTxt
    let imageUrl = product.imageUrl

    let id_ele = document.getElementById('_id');
    id_ele.innerHTML = id
    
    let altTxt_ele = document.getElementById('altTxt');
    altTxt_ele.innerHTML = altTxt
    
    let imageUrl_ele = document.getElementById('imageUrl');
    imageUrl_ele.innerHTML = imageUrl

    let title_ele = document.getElementById('title');
    title_ele.innerHTML = nom
    
    let prix_ele = document.getElementById('price');
    prix_ele.innerHTML = prix
    
    let description_ele = document.getElementById('description');
    description_ele.innerHTML = description
    
    let color_ele = document.getElementById('colors');
    color_ele.innerHTML = color
})
.catch(function (err) {
    // Une erreur est survenue
});