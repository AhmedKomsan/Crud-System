let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let update = document.getElementById("update");
let indexUpdate = 0;

// get total
function calculateTotal() {
  if (price.value != "") {
    let amount = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = amount;
    total.style.background = "#060";
  } else {
    total.innerHTML = "0";
    total.style.background = "#a50f0f";
  }
}
calculateTotal();

// create product

let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}
function createProducts() {
  if (
    title.value != "" &&
    price.value != "" &&
    count.value != "" &&
    category.value != ""
  ) {
    let product = {
      title: title.value,
      price: +price.value,
      taxes: +taxes.value,
      ads: +ads.value,
      discount: +discount.value,
      total: +total.innerHTML,
      count: +count.value,
      category: category.value,
    };

    products.push(product);

    // local storage
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    displayData();
  }
}
displayData();

// clear inputs

function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
}
//display
function displayData() {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].count}</td>
            <td>${products[i].category}</td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
            <td><button  onclick="setData(${i})">Update</button></td>
        </tr>
        `;
  }
  document.getElementById("t-body").innerHTML = cartona;
  let btnDelete = document.getElementById("deleteAll");
  if (products.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${products.length}) </button>`;
  } else {
    btnDelete.innerHTML = "";
  }
  calculateTotal();
}

// delete
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.product = JSON.stringify(products);
  displayData();
}
function deleteAll() {
  localStorage.clear();
  products.splice(0);
  displayData();
}
// count
// update
function setData(i) {
  indexUpdate = i;
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  total.value = products[i].total;
  count.value = products[i].count;
  category.value = products[i].category;
  calculateTotal();
  update.classList.remove("d-none");
  submit.classList.add("d-none");
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
function updateProduct() {
  if (
    title.value != "" &&
    price.value != "" &&
    count.value != "" &&
    category.value != ""
  ) {
    let product = {
      title: title.value,
      price: +price.value,
      taxes: +taxes.value,
      ads: +ads.value,
      discount: +discount.value,
      total: +total.innerHTML,
      count: +count.value,
      category: category.value,
    };
    products.splice(indexUpdate, 1, product);

    // local storage
    localStorage.setItem("product", JSON.stringify(products));
    clearInputs();
    displayData();
    update.classList.add("d-none");
    submit.classList.remove("d-none");
  }
}

// search

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  displayData();
}
function getSearch(value) {
  let cartona = "";
  for (let i = 0; i < products.length; i++) {
    if (searchMood == "title") {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        cartona += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].count}</td>
            <td>${products[i].category}</td>
            <td><button onclick="deleteProduct(${i})">Delete</button></td>
            <td><button  onclick="setData(${i})">Update</button></td>
        </tr>
        `;
      }
    } else {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        cartona += `
      <tr>
          <td>${i + 1}</td>
          <td>${products[i].title}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].count}</td>
          <td>${products[i].category}</td>
          <td><button onclick="deleteProduct(${i})">Delete</button></td>
          <td><button  onclick="setData(${i})">Update</button></td>
      </tr>
      `;
      }
    }
  }

  document.getElementById("t-body").innerHTML = cartona;
}
// clean data
