let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let product = document.querySelector('.product');
let close = document.querySelector('.close');

iconCart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        product.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        product.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    product.style.transform = 'translateX(0)';
})

let products = null;
//get data from file json
fetch('js/product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

//Show datas in list html
function addDataToHTML() {
    let productHTML = document.querySelector('.product');
    productHTML.innerHTML = '';

     // Membuat judul utama
     let mainHeading = document.createElement('h1');
     mainHeading.classList.add('heading');
     mainHeading.innerHTML = 'Berdasarkan <span>Menu</span>';
     productHTML.appendChild(mainHeading);

    if (products != null) {
        let rowContainer; 

        products.forEach((product, index) => {

            if (index % 3 === 0) {
                rowContainer = document.createElement('div');
                rowContainer.classList.add('row-container'); 
                productHTML.appendChild(rowContainer);
            }

            let newProduct = document.createElement('div');
            newProduct.classList.add('box-container');
            newProduct.innerHTML = `
                <div class="box">
                <span class="discount">-30%</span>
                <div class="icons">
                    <a href="#" class="fas fa-share"></a>
                </div>
                <img src="${product.image}" >
                <h3>${product.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <div class="price">Rp.${product.price}</div>
                <button onclick="addCart(${product.id})">masukan keranjang</button>
                </div>
            `;

            rowContainer.appendChild(newProduct); 
        });
    }
}
let listCart = [];
// and i get cookie data cart
function chekCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
chekCart();


function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    // if this product is not in the cart
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        // add data product in cart
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    }else{
        // if this product is already in the cart
        // i just incresed the quantity
        listCart[$idProduct].quantity++;
    }
    //i will save data cart in cookie 
    // to save this datas cart when i turn of the computer
    let timeSave = "expires=Thu, 31 Des 2025 23:59:59 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    //clear data default;
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let toalQuantity = 0;

    if(listCart){
        listCart.forEach(product =>{
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                `<img src="${product.image}" >
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">Rp.${product.price}</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>`;
                listCartHTML.appendChild(newCart);
                toalQuantity = toalQuantity + product.quantity;
            } 
        })
    }
    totalHTML.innerText = toalQuantity;
    
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    let timeSave = "expires=Thu, 31 Des 2025 23:59:59 UTC";
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";

    //reload list cart in HTML
    addCartToHTML();
}


menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if (window.scrollY > 150) {
            header.classList.add('active');
    } else {
            header.classList.remove('active');
    }
    
}
