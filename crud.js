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
                <button class="edit" data-id="${id}">Edit</button>
                <button class="delete"data-id="${id}>Delete</button>
              </div>
            </div>`;

      productList.appendChild(div);
    }
  } else {
    console.log("Something went wrong");
  }

  var editBtn = document.querySelectorAll(".edit"); //edit-button//
  var deleteBtn = document.querySelectorAll(".delete"); //delete-button//

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      deleteProduct(i + 1);
    });
    editBtn[i].addEventListener("click", (event) => {
      formContainer.style.display = "flex";
      editProduct(event, i);
    });
  }
}

function setProducts(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const products = Object.fromEntries(data.entries());
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];
  products.id = myProducts.length + 1;
  myProducts.push(products);
  localStorage.setItem("products", JSON.stringify(myProducts));
  id++;
  form.reset();
  window.location.href = "crud.html";
}

// assign ids to products available
function assignIdsToProducts() {
  let productData = JSON.parse(localStorage.getItem("products")) || [];
  productData.forEach((e, i) => {
    e.id = i + 1;
  });
  maximumID = productData.length || 1;
}

function deleteProduct(id) {
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];
  const deleteID = myProducts.findIndex((item) => item.id == id);
  myProducts.splice(deleteID, 1);
  localStorage.setItem("products", JSON.stringify(myProducts));
  getProducts();
}

if (window.location.href.split("/").at(-1) == "crud.html") {
  assignIdsToProducts();
  getProducts();
}
