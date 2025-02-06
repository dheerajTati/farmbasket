let cartItems = []

veggies = [
    {imageUrl: 'carrot.jpg', rating: '4.5', name: 'Carrot', price: '50.00/kg' },
    {imageUrl: 'tomato.jpg', rating: '4.7', name: 'Tomato', price: '25.00/kg' },
    {imageUrl: 'dosakaya.webp', rating: '4.5', name: 'Dosakai', price: '30.00/kg' },
    {imageUrl: 'cucumber.webp', rating: '4.8', name: 'Cucumber', price: '40.00/kg' },
    {imageUrl: 'bell-pepper.webp', rating: '4.6', name: 'Capsicum', price: '60.00/kg' },
    {imageUrl: 'onion.jpg', rating: '4.7', name: 'Onion', price: '30.00/kg' },
    {imageUrl: 'garlic.jpg', rating: '4.4', name: 'Garlic', price: '110.00/kg' },
    {imageUrl: 'potato.jpg', rating: '4.9', name: 'Potato', price: '35.00/kg' },
    {imageUrl: 'spinach.jpg', rating: '4.5', name: 'Spinach', price: '10.00/pack' },
    {imageUrl: 'pumpkin.jpg', rating: '4.5', name: 'Pumpkin', price: '40.00/kg' },
    {imageUrl: 'cauliflower.jpg', rating: '4.6', name: 'Cauliflower', price: '25.00/kg' },
    {imageUrl: 'peas.jpg', rating: '4.5', name: 'Peas', price: '15.00/pack' },
    {imageUrl: 'ladyfinger.jpg', rating: '4.5', name: 'Lady Finger', price: '30.00/kg' },
    {imageUrl: 'brinjal.webp', rating: '4.5', name: 'Brinjal', price: '24.00/kg' },
    {imageUrl: 'cabbage.jpg', rating: '4.8', name: 'Cabbage', price: '30.00/kg' },
    {imageUrl: 'chikkidi.jpg', rating: '4.3', name: 'Chikkudai', price: '40.00/kg' },
    
]

veggiesContainer = document.getElementById('veggiesContainer')
if (veggiesContainer!== null)
{
    veggiesContainer.innerHTML = veggies.map(veggie => {
    return `
      <div class="block">
        <img src="${veggie.imageUrl}" alt="${veggie.name}"/>
        <div class="rating">⭐ ${veggie.rating}</div>
        <div class="price">₹${veggie.price}</div>
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
                  <span style="display: flex; gap: 5px"><p>Price: </p><p id='${index}-price'>${parseInt(item.price) * parseInt(item.quantity)}</p></span>
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