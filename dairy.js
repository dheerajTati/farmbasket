let cartItems = []

veggies = [
    {imageUrl: 'milk.cms', rating: '4.5', name: 'Buffalo Milk', price: '80/ltr' },
    {imageUrl: 'cow-milk.webp', rating: '4.7', name: 'Cow Milk', price: '65/ltr' },
    {imageUrl: 'egg.jpg', rating: '4.5', name: 'Eggs', price: '5/peace' },
    {imageUrl: 'c-egg.jpg', rating: '4.8', name: 'Country Eggs', price: '10/peace' },

    
]

veggiesContainer = document.getElementById('veggiesContainer')
if (veggiesContainer!== null)
{
    veggiesContainer.innerHTML = veggies.map(veggie => {
    return `
      <div class="card">
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