const main = document.getElementById('main');
const message = document.getElementById('message');
const things = document.getElementById('things');
const totalPriceElement = document.getElementById('total-price');

let totalPrice = 0;

fetch('https://fakestoreapi.com/products?limit=10')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        main.innerHTML = '';
        data.forEach(element => {
            const product = document.createElement('div');
            product.className = 'product';
            product.innerHTML = 
                `
                <img src="${element.image}" alt="">
                <h2 class="name">${element.title}</h2>
                <p class="description">${element.description.slice(0, 100)}...</p>
                <div class="prices">
                    <h3 class="price">${element.price}$</h3>
                    <button onclick="addToCart(${element.id}, '${element.title}', ${element.price}, '${element.image}')">ORDER</button>
                </div>
                `
            
            main.appendChild(product);
        });
        
    });

main.style.display = 'flex';
main.style.flexWrap = 'wrap';
main.style.gap = '50px';
main.style.justifyContent = 'center';


function addToCart(id, title, price, img) {
    message.innerHTML = '';
    message.innerHTML = `
        <p><b>${title.slice(0, 8)}...</b> добавлено в корзину.</p>
        <img src="img/cancel_24dp_8B1A10_FILL0_wght400_GRAD0_opsz24.png" alt="" id="cancel">
    `
    ;
    message.style.display = 'flex';
    message.setAttribute('data-aos', 'fade-left');
    message.setAttribute('data-aos-delay', '10');
    
    message.classList.remove('aos-animate');
    setTimeout(() => {
        message.classList.add('aos-animate');
    }, 10);
    const cancel = document.getElementById('cancel');
    cancel.addEventListener('click', () => {
        message.style.display = 'none';
    });
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);


    const thing = document.createElement('div');
    thing.className = 'thing';
    thing.innerHTML = ` 
        <img src="${img}" alt="">
        <p>${title}</p>
        <p>${price}$</p>
    `;
    things.appendChild(thing);

    totalPrice += price;
    totalPriceElement.innerText = `Total Price: ${totalPrice.toFixed(2)}$`;
}
