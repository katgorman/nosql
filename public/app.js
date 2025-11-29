// base URL for the API endpoints for items
const API_URL = "/api/items";

// fetches all items from the server and display them in a table
async function loadItems() {
  // send a GET request to the API to get all items
  const res = await fetch(API_URL);
  // parse the JSON response into a JavaScript array
  const items = await res.json();

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
          <button onclick="updateItem('${item._id}')">Update</button>
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
    body: JSON.stringify({ name, quantity, price })   // convert JS object to JSON string
  });

  // reload the items table to show the new item
  loadItems();
}

// updates an item's quantity
async function updateItem(id) {
  // ask the user for the new quantity using a prompt
  const quantity = prompt("New quantity:");
  // if the user cancels or enters nothing, exit the function
  if (!quantity) return;

  // send a PUT request to update the specific item by its ID
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }) // send updated quantity
  });

  // reload the items table to show the updated quantity
  loadItems();
}

// deletes an item
async function deleteItem(id) {
  // send a DELETE request to remove the item by ID
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  // reload the items table to remove the deleted item from the view
  loadItems();
}

// initial load: populate the table when the page first loads
loadItems();
