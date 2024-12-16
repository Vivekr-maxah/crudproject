var product = document.getElementById("product");
var form = document.getElementById("form");
var productList = document.getElementById("productList");
var id;
var ids = [];

function getProducts() {
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (myProducts && myProducts.length > 0) {
    productList.innerHTML = "";
    for (const product of myProducts) {
      var div = document.createElement("div");
      div.classList += "card";

      div.innerHTML = `
            <div class="card-im">
              <img
                src="${product.image}"
              />
            </div>

            <div class="text-card"><h2>${product.name}</h2></div>
            <div class="p-card">
              <p>
              ${product.description}
                </p>
              <h3>${product.price}</h3>
              <h3>${product.quantity}</h3>

              <div class="button">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
              </div>
            </div>`;
      productList.appendChild(div);
    }
  } else {
    console.log("Something went wrong");
  }
}

function setProducts(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const products = Object.fromEntries(data.entries());
  products.id = id;
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];
  myProducts.push(products);
  localStorage.setItem("products", JSON.stringify(myProducts));
  id++;
  form.reset();
  window.location.href = "crud.html";
}

// assign ids to products available
function assignIdsToProducts() {
  var productData = JSON.parse(localStorage.getItem("products")) || [];

  for (const product of productData) {
    ids.push(product.id);
  }
  let maximumID = Math.max.apply(null, ids);
  if (ids.length === 0 || maximumID === -Infinity) {
    id = 1;
  } else {
    id = maximumID + 1;
  }
}

assignIdsToProducts();
getProducts();
