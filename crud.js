const productList = document.getElementById("productList");

// Fetch Products and Render
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = `
      <div class="card">
        <div class="card-im">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="text-card">
          <h2>${product.name}</h2>
        </div>
        <div class="p-card">
          <p>${product.description}</p>
          <h3>Price: ${product.price}</h3>
          <h3>Quantity: ${product.quantity}</h3>
          <div class="tags">
          ${tagTemplate(product.tags)}
          </div>
          <div class="button">
            <button onclick="handleProductAction(${
              product.id
            }, 'edit')" class="edit">Edit</button>
            <button onclick="handleProductAction(${
              product.id
            }, 'delete')" class="delete">Delete</button>
          </div>
        </div>
      </div>
    `;
    productList.insertAdjacentHTML("beforeend", card);
  });
  // console.log(products);
}

// Save Product (Add or Update)
function saveProduct(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const tags = document.getElementById("tag").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (id) {
    // Update Product
    products = products.map((p) =>
      p.id == id
        ? { id: Number(id), name, price, quantity, tags, description, image }
        : p
    );
  } else {
    // Add Product
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      price,
      quantity,
      tags,
      description,
      image,
    };
    products.push(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(products));
  window.location.href = "crud.html";
}

// Edit or Delete Product
function handleProductAction(id, action) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (action === "edit") {
    const product = products.find((p) => p.id == id);
    localStorage.setItem("editProduct", JSON.stringify(product));
    window.location.href = "add-form.html";
  } else if (action === "delete") {
    products = products.filter((p) => p.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    setID(products);
    loadProducts();
  }
}

// Prefill Form for Editing
function prefillForm() {
  const product = JSON.parse(localStorage.getItem("editProduct"));
  if (product) {
    document.getElementById("id").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("tag").value = product.tags;
    document.getElementById("description").value = product.description;
    document.getElementById("image").value = product.image;

    localStorage.removeItem("editProduct");
  }
}

// Initialize Page
if (window.location.pathname.endsWith("crud.html")) {
  loadProducts();
} else if (window.location.pathname.endsWith("add-form.html")) {
  prefillForm();
}

function setID(products) {
  products.forEach((element, index) => {
    element.id = index + 1;
  });
  localStorage.setItem("products", JSON.stringify(products));
}

function tagTemplate(tags) {
  let tagsString = "";
  if (tags && typeof tags === "string") {
    tags = tags.split(",");
    tags.forEach((tag) => {
      tagsString += `<div class="tag">${tag.trim()}</div>`;
    });
    return tagsString;
  }
}

// ----------------------- validateForm----------------------
// Save Product (Add or Update) with Validation

function saveProduct(event) {
  event.preventDefault();

  // Validate Form Inputs
  if (!validateForm()) return;

  // Gather Form Data
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const tags = document.getElementById("tag").value.trim();
  const description = document.getElementById("description").value.trim();
  const image = document.getElementById("image").value.trim();

  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (id) {
    // Update Product
    products = products.map((p) =>
      p.id == id
        ? { id: Number(id), name, price, quantity, tags, description, image }
        : p
    );
  } else {
    // Add New Product
    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name,
      price,
      quantity,
      tags,
      description,
      image,
    };
    products.push(newProduct);
  }

  // Save to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Redirect to CRUD page
  window.location.href = "crud.html";
}

function validateForm() {
  // Define fields to validate
  const fields = [
    {
      id: "name",
      message: "Please enter a valid name.",
      validate: isValidName,
    },
    {
      id: "price",
      message: "Price must be a positive integer.",
      validate: isPositiveNumber,
    },
    {
      id: "quantity",
      message: "Quantity must be a positive integer.",
      validate: isPositiveNumber,
    },
    {
      id: "tag",
      message: "Tags must be comma-separated words.",
      validate: isValidTags,
    },
    {
      id: "description",
      message: "Description length should be between 3 and 100 characters.",
      validate: isValidDescription,
    },
  ];

  let allInputsValid = true;

  // Clear existing errors
  document
    .querySelectorAll(".error-message")
    .forEach((element) => element.remove());
  document
    .querySelectorAll(".input-error")
    .forEach((input) => input.classList.remove("input-error"));

  // Validate each field
  fields.forEach(({ id, message, validate }) => {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (!validate(value)) {
      showError(input, message);
      allInputsValid = false;
    } else {
      clearError(input);
    }
  });

  return allInputsValid;
}

function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-message")) {
    error = document.createElement("span");
    error.className = "error-message";
    input.parentNode.appendChild(error);
  }
  input.classList.add("input-error");
  error.innerText = message;

  // Apply red border for invalid inputs
  input.style.borderColor = "red";
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains("error-message")) {
    error.remove();
  }
  input.classList.remove("input-error");

  // Remove red border for valid inputs
  input.style.borderColor = "";
}

// Validators
function isValidImageURL(value) {
  const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))(\?.*)?$/i;
  return pattern.test(value);
}

function isValidName(value) {
  return /^(?!^\d+$)[A-Za-z\d\s]+$/.test(value);
}

function isValidDescription(value) {
  return value.length >= 3 && value.length <= 100;
}

function isPositiveNumber(value) {
  return /^\d+$/.test(value) && parseInt(value) > 0;
}

function isValidTags(value) {
  return value === "" || /^([\w\s]+,)*[\w\s]+$/.test(value);
}
