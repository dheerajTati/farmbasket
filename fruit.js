let cartItems = []

veggies = [
    {imageUrl: 'banana.webp', rating: '4.5', name: 'Banana', price: '50' },
    {imageUrl: 'apple.webp', rating: '4.7', name: 'Apple', price: '80' },
    {imageUrl: 'orange.webp', rating: '4.5', name: 'Orange', price: '60' },
    {imageUrl: 'B-grape.webp', rating: '4.8', name: 'Black Grapes', price: '60' },
    {imageUrl: 'G-grape.jpg', rating: '4.6', name: 'Green Grapes', price: '80' },
    {imageUrl: 'watermelon.jpg', rating: '4.7', name: 'Water Melon', price: '40' },
    {imageUrl: 'melon.jpg', rating: '4.4', name: 'Musk Melon', price: '50' },
    {imageUrl: 'pomegranate.jpg', rating: '4.9', name: 'Pomegranate', price: '55' },
    {imageUrl: "Pineapple.png", rating: '4.5', name: 'Pineapple', price: '60' },
    {imageUrl: 'sapota.jpg', rating: '4.5', name: 'Sapota', price: '50' },
    {imageUrl: 'mango.jpg', rating: '4.6', name: 'Mango', price: '100' },
    {imageUrl: 'papaya.webp', rating: '4.5', name: 'Papaya', price: '45' },
    {imageUrl: 'guava.jpg', rating: '4.5', name: 'Gauva', price: '30' },
    {imageUrl: 'chakar.jpg', rating: '4.8', name: 'Chakrakkeli', price: '80' },
    
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
  // console.log(cartItems)
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