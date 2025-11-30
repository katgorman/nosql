// base URL for the API endpoints for items
const API_URL = "/api/items";

// fetches all items from the server and display them in a table
async function loadItems() {
  const res = await fetch(API_URL); // send a GET request to the API to get all items
  const items = await res.json();   // parse the JSON response into a JavaScript array

  // get the table element from the HTML where items will be displayed
  const table = document.getElementById("items-table");
  table.innerHTML = "<tr><th>Name</th><th>Qty</th><th>Price</th><th>Actions</th></tr>";

  // loop through each item and add a row to the table
  items.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>  <!-- Display item name -->
        <td>${item.quantity}</td>  <!-- Display item quantity -->
        <td>$${item.price}</td>  <!-- Display item price -->
        <td>
          <!-- Buttons to update or delete the item -->
          <button onclick="updateItem('${item._id}', '${item.name}', ${item.price}, ${item.quantity})">Update</button>
          <button onclick="deleteItem('${item._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// creates a new item using values from input fields
async function createItem() {
  // get the values from input fields in the HTML form
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  // send a POST request to the API to create a new item
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // specify JSON content
    body: JSON.stringify({ name, quantity, price })  // convert JS object to JSON string
  });

  // reload the items table to show the new item
  loadItems();
}

// updates an item
let currentItemId = null;
let originalName = "";
let originalPrice = "";
let originalQuantity = "";

// open modal with pre-filled data
function updateItem(id, name, price, quantity) {
    currentItemId = id;

    // store original values in case fields are left blank
    originalName = name;
    originalPrice = price;
    originalQuantity = quantity;

    document.getElementById("editName").value = name;
    document.getElementById("editPrice").value = price;
    document.getElementById("editQuantity").value = quantity;

    document.getElementById("updateModal").style.display = "flex";
}

// close modal
function closeModal() {
    document.getElementById("updateModal").style.display = "none";
}

// save update
document.getElementById("saveUpdate").onclick = async function () {
    let newName = document.getElementById("editName").value.trim();
    let newPrice = document.getElementById("editPrice").value.trim();
    let newQuantity = document.getElementById("editQuantity").value.trim();

    // keep old values if empty
    if (newName === "") newName = originalName;
    if (newPrice === "") newPrice = originalPrice;
    if (newQuantity === "") newQuantity = originalQuantity;

    await fetch(`/api/items/${currentItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newName,
            price: Number(newPrice),
            quantity: Number(newQuantity)
        })
    });

    closeModal();
    loadItems();
};


// deletes an item
async function deleteItem(id) {
  // send a DELETE request to remove the item by ID
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  // reload the items table to remove the deleted item from the view
  loadItems();
}

// initial load: populate the table when the page first loads
loadItems();
