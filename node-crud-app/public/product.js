document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const file = document.getElementById('productFile').files[0];
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        displayProduct(result);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      products.forEach(product => displayProduct(product));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayProduct(product) {
    const productList = document.getElementById('productList');
    const productDiv = document.createElement('div');
    productDiv.classList.add('col-md-4', 'mb-3');
    productDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Precio: $${product.price}</p>
          <a href="/${product.file}" target="_blank" class="btn btn-primary">Ver Archivo</a>
        </div>
      </div>
    `;
    productList.appendChild(productDiv);
  }
  
  fetchProducts();
  