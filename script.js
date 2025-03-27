let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {
    const productGrid = document.getElementById("product-grid");
    const categoryFilter = document.getElementById("category-filter");
    const searchBar = document.getElementById("search-bar");
    const cartCount = document.getElementById("cart-count");

    function updateCartCount() {
      cartCount.innerText = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function displayProducts(filteredProducts) {
      productGrid.innerHTML = "";
      filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
      });

      document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
          const productId = e.target.dataset.id;
          const product = products.find(p => p.id == productId);
          cart.push(product);
          updateCartCount();
        });
      });
    }

    displayProducts(products);
    updateCartCount();

    categoryFilter.addEventListener("change", () => {
      const selectedCategory = categoryFilter.value;
      const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category === selectedCategory);
      displayProducts(filteredProducts);
    });

    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });
  })
  .catch(error => console.error("Error fetching products:", error));
