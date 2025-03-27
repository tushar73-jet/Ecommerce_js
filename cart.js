let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsDiv = document.getElementById("cart-items");
const clearCartButton = document.getElementById("clear-cart");

function displayCartItems() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItemsDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" width="50">
      <strong>${item.title}</strong> - $${item.price.toFixed(2)}
    </div>
  `).join("");
}

clearCartButton.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
});

displayCartItems();
