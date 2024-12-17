var product = document.getElementById("product");
var form = document.getElementById("form");
var productList = document.getElementById("productList");
var id;
var ids = [];
var input = document.querySelectorAll("input");

function getProducts() {
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];

  productList.innerHTML = "";
  if (myProducts && myProducts.length > 0) {
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
                <button class="edit" data-id="${product.id}">Edit <b>${product.id}</b></button>
                <button class="delete"data-id="${product.id}">Delete <b>${product.id}</b></button>
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
      window.location.replace("add-form.html");
      fieldpass(i); //fieldpass//
      editProduct(event, i);
    });
  }
}

// -------------fieldpass------------//
function fieldpass(i) {
  let objValues = Object.values(productCollection[i - 1]);
  for (let index = 0; index < input.length; index++) {
    formInputs[index].value = objValues[index];
  }
}

// ----------editProduct------------//

function editProduct(event) {
  const productId = parseInt(event.target.dataset.id); // Get the product ID from the button
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Find the product by its ID
  let productToEdit = myProducts.find((product) => product.id === productId);

  // Ensure the form container exists before trying to show it
  const formContainer = document.getElementById("container");
  if (formContainer) {
    formContainer.style.display = "block"; // Show the form container
  } else {
    console.error("container not found!");
  }

  // Fill the form inputs with the current product data
  const form = document.getElementById("productForm");
  form.name.value = productToEdit.name;
  form.price.value = productToEdit.price;
  form.quantity.value = productToEdit.quantity;
  form.description.value = productToEdit.description;
  form.image.value = productToEdit.image;
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
  assignIdsToProducts();
}

// assign ids to products available
function assignIdsToProducts() {
  let productData = JSON.parse(localStorage.getItem("products")) || [];
  productData.forEach((e, i) => {
    e.id = i + 1;
  });
  maximumID = productData.length || 1;
  localStorage.setItem("products", JSON.stringify(productData));
}

function deleteProduct(id) {
  let myProducts = JSON.parse(localStorage.getItem("products")) || [];
  const deleteID = myProducts.findIndex((item) => item.id == id);
  myProducts.splice(deleteID, 1);
  localStorage.setItem("products", JSON.stringify(myProducts));
  assignIdsToProducts();
  getProducts();
}

if (window.location.href.split("/").at(-1) == "crud.html") {
  assignIdsToProducts();
  getProducts();
}

// function validation() {
//   const name = document.getElementById("name");
//   const price = document.getElementById("price");
//   const quantity = document.getElementById("quantity");
//   const description = document.getElementById("description");
//   const image = document.getElementById("image");
//   let errors = [];

//   // Validate Name
//   if (!name.value.trim()) {
//     errors.push("Name is required.");
//   }

//   // Validate Price
//   if (!price.value.trim() || isNaN(price.value) || price.value <= 0) {
//     errors.push("Price must be a valid number greater than 0.");
//   }

//   // Validate Quantity
//   if (!quantity.value.trim() || isNaN(quantity.value) || quantity.value <= 0) {
//     errors.push("Quantity must be a valid number greater than 0.");
//   }

//   // Validate Description
//   if (!description.value.trim()) {
//     errors.push("Description is required.");
//   } else {
//     // Condition 1: Length check
//     if (description.value.length < 10 || description.value.length > 200) {
//       errors.push("Description must be between 10 and 200 characters.");
//     }

//     // Condition 2: Check for restricted words
//     const restrictedWords = ["invalid", "test", "error"];
//     for (const word of restrictedWords) {
//       if (description.value.toLowerCase().includes(word)) {
//         errors.push(`Description cannot contain the word "${word}".`);
//         break;
//       }
//     }
//   }

//   // Validate Image URL
//   if (!image.value.trim()) {
//     errors.push("Image URL is required.");
//   }

//   // Display Errors or Submit Form
//   if (errors.length > 0) {
//     alert(errors.join("\n")); // Display all errors
//     return false; // Stop form submission
//   }
// }
