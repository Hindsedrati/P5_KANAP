function getProducts(){

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(res) {
    let s ="";
    for(let product of res){
        let id = product._id;
        let nom = product.name;
        let prix = product.price;
        let color = product.colors;
        let description = product.description;
        let altTxt = product.altTxt;
        let imageUrl = product.imageUrl
        
        s+= '<a href="./product.html?id='+id+'">'+
        '<article>'+
        '<img src="'+imageUrl+'" alt="'+altTxt+'">'+
        '<h3 class="productName">'+nom+'</h3>'+
        '<p class="productDescription">'+description+'</p>'+
        //'<button id="color">'+color+'</button>'+
        '</article>'+
        '</a>';
        
    }
    let section = document.getElementById('items');
    section.innerHTML = s
    console.log(s);
    
})

.catch(function(err) {
    // Une erreur est survenue
});
}