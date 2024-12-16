var product = document.getElementById("product");
var form = document.getElementById("form");
// form.addEventListener("submit", setProducts);
// let productName = document.getElementById("productname");
// let productPrice = document.getElementById("productprice");
// let productQuantity = document.getElementById("productquantity");
// let productDescription = document.getElementById("productdescription");
var productList = document.getElementById("productList");
var id;
var ids = [];
var productData = JSON.parse(localStorage.getItem("products")) || [];

// var products = JSON.parse(localStorage.getItem("products")) || [];
for (const product of productData) {
  ids.push(product.id);
}
let maximumID = Math.max.apply(null, ids);
if (ids.length === 0 || maximumID === -Infinity) {
  id = 1;
} else {
  id = maximumID + 1;
}

function product() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.id = "product-item";
    productItem.innerHTML = `
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Quantity:</strong> ${product.quantity}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <button onclick="updateProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
    productList.appendChild(productItem);
  });
}

function getProducts() {
  function getData() {
    let myProducts = JSON.parse(localStorage.getItem("products"));

    if (products && myProducts && myProducts.length > 0) {
      products.innerHTML = "";
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
              ${product.dedescription}
                </p>
              <h3>${Product.Price}</h3>
              <h3>${product.quantity}</h3>

              <div class="button">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
              </div>
            </div>`;
        products.appendChild(div);
      }
    } else {
      console.log("Something went wrong");
    }
  }
  // return JSON.parse(localStorage.getItem("products"));
}

function setProducts(event) {
  event.preventDefault();
  console.log(event);

  const data = new FormData(event.target);

  // Do a bit of work to convert the entries to a plain JS object
  const products = Object.fromEntries(data.entries());
  products.id = id;
  productData.push(products);
  localStorage.setItem("products", JSON.stringify(productData));
  id++;
  console.log(products);
  form.reset(); // RESET DATA //
}
