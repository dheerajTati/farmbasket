let cartItems = []

veggies = [
    {imageUrl: 'https://www.jiomart.com/images/product/original/590000454/banana-robusta-1-kg-product-images-o590000454-p590000454-0-202410011654.jpg?im=Resize=(420,420)', rating: '4.5', name: 'Banana', price: '50' },
    {imageUrl: 'https://5.imimg.com/data5/AK/RA/MY-68428614/apple-500x500.jpg', rating: '4.7', name: 'Apple', price: '80' },
    {imageUrl: 'https://thumbs.dreamstime.com/b/mandarin-orange-23753206.jpg', rating: '4.5', name: 'Orange', price: '60' },
    {imageUrl: 'https://balidirectstore.com/wp-content/uploads/2020/05/Local-Grape.jpg', rating: '4.8', name: 'Black Grapes', price: '60' },
    {imageUrl: 'https://gofresh.com.kw/wp-content/uploads/2023/10/grapgree-1.jpg', rating: '4.6', name: 'Green Grapes', price: '80' },
    {imageUrl: 'https://gofresh.com.kw/wp-content/uploads/2023/10/fresh-watermelon-500x500-1-1.jpg', rating: '4.7', name: 'Water Melon', price: '40' },
    {imageUrl: 'https://t4.ftcdn.net/jpg/04/91/17/41/360_F_491174177_3O3lB3hRphDDssVTFKduq01isvN37ieG.jpg', rating: '4.4', name: 'Musk Melon', price: '50' },
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9XKsBxR30YIatSMOu8JoPL_vV20piDDC3Q&s', rating: '4.9', name: 'Pomegranate', price: '55' },
    {imageUrl: 'https://jivabhumi.com/cdn/shop/products/Pineapple.png?v=1670225397&width=720', rating: '4.5', name: 'Pineapple', price: '60' },
    {imageUrl: 'https://m.media-amazon.com/images/I/41GY9dnkwuL.AC_UF1000,1000_QL80.jpg', rating: '4.5', name: 'Sapota', price: '50' },
    {imageUrl: 'https://getfreshswansea.co.uk/wp-content/uploads/2020/07/mango.jpg', rating: '4.6', name: 'Mango', price: '100' },
    {imageUrl: 'https://seed2plant.in/cdn/shop/products/papayaseeds.jpg?v=1606739358', rating: '4.5', name: 'Papaya', price: '45' },
    {imageUrl: 'https://www.ladybirdnursery.com.au/wp-content/uploads/hawaiian-guava.jpg', rating: '4.5', name: 'Gauva', price: '30' },
    {imageUrl: 'https://d1sl07a7h3d3fr.cloudfront.net/admin/product/4309c0b7-3845-4432-8095-ba509459939b-156.jpg', rating: '4.8', name: 'Chakrakkeli', price: '80' },
    
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
cartItems = JSON.parse(localStorage.getItem('cartItems'))
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
    updateTotal()
    window.location.reload()
    alert('item removed')
    return
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  window.location.reload()
  price = document.getElementById(`${id}-price`)
  price.innerText = parseInt(parseInt(amount)*parseInt(quantity.innerText))
  cartItems[id].price = price.innerText
  updateTotal()
}

const total = document.getElementById('total')
let net = 0
cartItems.map((item) => {
  net += parseInt(item.price)
})
total.innerText = net

const updateTotal = () => {
    const total = document.getElementById('total')
    let net = 0
    cartItems.map((item) => {
      net += parseInt(item.price)
    })
    total.innerText = net
}