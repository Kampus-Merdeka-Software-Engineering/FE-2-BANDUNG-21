let listCart = [];
//get data cart form cookie

// Mendapatkan data cart dari API
async function fetchCartData() {
    try {
      const response = await fetch('http://localhost:3000/Product/');
      const data = await response.json();
  
      // Setelah mendapatkan data, kita bisa memuatnya ke dalam array listCart
      listCart = data;
  
      // Menjalankan fungsi untuk menampilkan data ke HTML atau melakukan operasi lainnya
      addCartToHTML();
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
  
  // Memanggil fungsi fetchCartData saat halaman dimuat
  document.addEventListener('DOMContentLoaded', fetchCartData);
  
checkCart();
addCartToHTML();
function addCartToHTML(){
    //clear data from html
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    //if has product in cart
    if(listCart){
        listCart.forEach(product =>{
            if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML = 
                `<img src="${product.imageURL}" alt="">
                <div class="info">
                    <div class="name">${product.product_name}</div>
                    <div class="price">Rp.${product.price} </div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">
                Rp${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newP);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Rp' + totalPrice;
}

