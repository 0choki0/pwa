// Fetch the items from the Json file
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
  <li class="item">
    <img src="테스트용웹/${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset; 
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {
    return;
  }

  const filtered = items.filter(item => item[key] == value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const button = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  button.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
.then(items => {
  console.log(items);
  displayItems(items);
  setEventListeners(items)
})
.catch(console.log);