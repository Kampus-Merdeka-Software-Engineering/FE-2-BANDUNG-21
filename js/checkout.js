let listCart = [];

let button = document.getElementById('button')


button.addEventListener('click', async(e) => {
    e.preventDefault()
    let nama = $('#nama').val();
    let alamat = $('#alamat').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let negara = $('#negara').val();
    let kota = $('#kota').val();
    if(nama == '') {
        alert('Nama tidak boleh kosong!')
    }else if(alamat == '') {
        alert('Alamat tidak boleh kosong!')
    }else if(email == '') {
        alert('Email tidak boleh kosong!')
    }else if(phone == '') {
        alert('Email tidak boleh kosong!')
    }else if(phone == '') {
        alert('Telpon tidak boleh kosong!')
    }else if(negara == '') {
        alert('Pilih negara anda!')
    }else if(kota == '') {
        alert('Pilih kota anda!')
    }else{
        let data = {
            username: $('#nama').val(),
            alamat: $('#alamat').val(),
            email: "syahrulmei002@gmail.com",
            phone: $('#telpon').val(),
            negara: $('#negara').val(),
            kota: $('#kota').val(),
            total_harga: parseInt($('.totalPrice').html().split(' ')[1]),
            total_barang: parseInt($('.totalQuantity').html()),
        }
        try {
            const response = await fetch('https://be-2-bandung-21-production.up.railway.app/Transaksi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
        
            if(response.status === 201){
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data berhasil di simpan',
                    icon: 'success'
                }).then((result) => {
                    window.location.href = 'index.html'
                })
            }
        } catch (error) {
            console.log(error);        
        }
    }


})

function checkCart(){
    var cookieValue = document.cookie
    .split(';')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
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
    totalPriceHTML.innerText = 'Rp ' + totalPrice;
}

