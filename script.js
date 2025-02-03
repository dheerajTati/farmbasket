let cartItems = []

veggies = [
    {imageUrl: 'https://images6.alphacoders.com/337/thumb-1920-337993.jpg', rating: '4.5', name: 'Carrot', price: '50' },
    {imageUrl: 'https://t4.ftcdn.net/jpg/03/54/24/17/360_F_354241708_IrEvwS6AeMei4ZZJHTSOC1xqtl79rS10.jpg', rating: '4.7', name: 'Tomato', price: '25' },
    {imageUrl: 'https://samsgardenstore.com/cdn/shop/files/EggShapeSambarCucumberSeeds_Desi_Dosakaya.webp?v=1726217496', rating: '4.5', name: 'Dosakai', price: '30' },
    {imageUrl: 'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-260nw-2177517539.jpg', rating: '4.8', name: 'Cucumber', price: '40' },
    {imageUrl: 'https://www.shutterstock.com/image-photo/big-ripe-sweet-bell-peppers-260nw-2290174821.jpg', rating: '4.6', name: 'Capsicum', price: '60' },
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIEcgf1brm2BkSkAIhED6l2AxzVR2jrYNIA&s', rating: '4.7', name: 'Onion', price: '30' },
    {imageUrl: 'https://static3.depositphotos.com/1007358/241/i/450/depositphotos_2415358-stock-photo-garlic-background.jpg', rating: '4.4', name: 'Garlic', price: '110' },
    {imageUrl: 'https://watermark.lovepik.com/photo/20211130/large/lovepik-farm-potato-harvest-picture_501286103.jpg', rating: '4.9', name: 'Potato', price: '35' },
    {imageUrl: 'https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-spinach-daytime-spinach-ingredients-outdoor-spinach-field-photography-map-image_851964.jpg', rating: '4.5', name: 'Spinach', price: '10' },
    {imageUrl: 'https://t3.ftcdn.net/jpg/04/33/68/88/360_F_433688869_iL1jlifAujX9WpEjWiJj6ez5AwOkb3n9.jpg', rating: '4.5', name: 'Pumpkin', price: '40' },
    {imageUrl: 'https://c1.wallpaperflare.com/preview/691/591/725/vegetable-cauliflower-cruciferous-healthy.jpg', rating: '4.6', name: 'Cauliflower', price: '25' },
    {imageUrl: 'https://images.healthshots.com/healthshots/en/uploads/2022/12/14213736/peas-1600x900.jpg', rating: '4.5', name: 'Peas', price: '15' },
    {imageUrl: 'https://t3.ftcdn.net/jpg/07/15/29/66/360_F_715296690_JRaWpNwQLCwqo6vBP8qC76xyfszBvffM.jpg', rating: '4.5', name: 'Lady Finger', price: '30' },
    {imageUrl: 'https://www.shutterstock.com/image-photo/eggplant-brinjal-grows-garden-on-600nw-2500380285.jpg', rating: '4.5', name: 'Brinjal', price: '24' },
    {imageUrl: 'https://media.istockphoto.com/id/641503708/photo/isolated-fresh-green-cabbage-on-white-background.jpg?s=612x612&w=0&k=20&c=rLdn-cN2QdmelpdEvlEKYKgewDHctMzv_c6aBBUIUz8=', rating: '4.8', name: 'Cabbage', price: '30' },
    {imageUrl: 'https://photos1.blogger.com/blogger/6981/1842/1600/chikkidi%20kaayi.jpg', rating: '4.3', name: 'Chikkudai', price: '40' },
    
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