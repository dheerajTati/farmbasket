let cartItems = []

veggies = [

    {imageUrl: 'https://i0.wp.com/www.freshelaexporters.com/wp-content/uploads/2024/01/raw-cashews-nuts-bag-dark-background-scaled.jpg?fit=1024%2C683&ssl=1', rating: '4.8', name: 'Cashews', price: '700' },
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqR9flxk0YUJMnIPxqNgBMUBIpqUuVCHIoAQ&s', rating: '4.8', name: 'Almonds', price: '650' },
    {imageUrl: 'https://img.freepik.com/free-photo/golden-raisins_2829-9427.jpg', rating: '4.8', name: 'Raisins', price: '400' },
    {imageUrl: 'https://media.istockphoto.com/id/1318595716/photo/roasted-and-salted-pistachio-seeds-with-shell-background-from-above.jpg?s=612x612&w=0&k=20&c=k-MCcYabWoUSXEwBSmK8xfYkdyWcFXC-Txqt-hXHdaE=', rating: '4.8', name: 'Pistachio', price: '1000' },
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdUEx2MF11xPkMd75CWMN26Hp3x_kMJlrow&s', rating: '4.8', name: 'Wal nuts', price: '1000' },
    {imageUrl: 'https://t4.ftcdn.net/jpg/01/40/37/39/360_F_140373924_z9PdAIZ1AjoTlHMOfkQ4WwrPR3BS5BIv.jpg', rating: '4.8', name: 'Dates', price: '350' },
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnPINOFX9K_X-nL-N56T31pRWMltOWEN-ymg&s', rating: '4.8', name: 'Anjeer', price: '500' },
    {imageUrl: 'https://media.istockphoto.com/id/1175603836/photo/pumpkin-seeds.jpg?s=612x612&w=0&k=20&c=0PQCwKjIyjfDa-rtSy-szBGHB6wNuAUrHeNA-trEVp4=', rating: '4.8', name: 'Pumpkin Seed', price: '400' },
    
]

veggiesContainer = document.getElementById('veggiesContainer')
if (veggiesContainer!== null)
{
    veggiesContainer.innerHTML = veggies.map(veggie => {
    return `
      <div class="card">
        <img src="${veggie.imageUrl}" alt="${veggie.name}"/>
        <div class="rating">⭐ ${veggie.rating}</div>
        <div class="price">₹${veggie.price}.00/kg</div>
        <b>${veggie.name}</b>
        <button class="cart-btn" onclick="addItem('${veggie.imageUrl}', '${veggie.rating}', '${veggie.price}', '${veggie.name}')">Add to Cart</button>
      </div>
    `;
  }).join('');
}

const addItem = (imageUrl, rating, price, name) => {
  const item = {imageUrl, rating, price, name, quantity: 1}
  cartItems.push(item)
  alert('Item added successfully')
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  console.log(cartItems)
}

cartContainer = document.getElementById('cartContainer')
const newCartItems = JSON.parse(localStorage.getItem('cartItems'))
if(newCartItems !== null){cartItems = newCartItems}
if(cartContainer !== null){
    cartContainer.innerHTML = cartItems.map((item, index) => {
        return `
          <div class="cart-item">
              <img src="${item.imageUrl}" alt=${item.name}">
              <div class="item-info">
                  <p>${item.name}</p>
                  <span style="display: flex; gap: 5px"><p>Price: </p><p id='${index}-price'>${item.price}</p></span>
              </div>
              <div class="quantity">
                  <button onclick="updateQuantity('-', '${index}', '${item.price}')">-</button>
                  <span id='${index}-quan'>${item.quantity}</span>
                  <button onclick="updateQuantity('+', '${index}', '${item.price}')">+</button>
              </div>
          </div>
        `
      }).join('');
}

const updateQuantity= (sign, id, amount) => {
  quantity = document.getElementById(`${id}-quan`)
  sign === '-' ? quantity.innerText = parseInt(quantity.innerText)-1 < 0 ? 0 : parseInt(quantity.innerText) -1
  : quantity.innerText = parseInt(quantity.innerText)+1
  if(parseInt(quantity.innerText) === 0){
    cartItems.splice(id, 1)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    window.location.reload()
    alert('item removed')
    return
  }
  price = document.getElementById(`${id}-price`)
  price.innerText = parseInt(parseInt(amount)*parseInt(quantity.innerText))
  cartItems[id].quantity = quantity.innerText
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  window.location.reload()
}

const total = document.getElementById('total')
let net = 0
cartItems.map((item) => {
  net += (parseInt(item.price)* parseInt(item.quantity))
})
total.innerText = net