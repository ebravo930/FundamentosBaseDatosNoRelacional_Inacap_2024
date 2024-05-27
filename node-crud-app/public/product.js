document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const file = document.getElementById('productFile').files[0];
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (file) {
      formData.append('file', file);
    }
  
    try {
      let response;
      if (id) {
        response = await fetch(`/api/products/${id}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('/api/products', {
          method: 'POST',
          body: formData
        });
      }
  
      const result = await response.json();
      if (response.ok) {
        fetchProducts();
        document.getElementById('productForm').reset();
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
      const productList = document.getElementById('productList');
      productList.innerHTML = '';
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
          <button class="btn btn-secondary mt-2" onclick="editProduct('${product._id}')">Editar</button>
          <button class="btn btn-danger mt-2" onclick="deleteProduct('${product._id}')">Eliminar</button>
        </div>
      </div>
    `;
    productList.appendChild(productDiv);
  }
  
  async function editProduct(id) {
    try {
      const response = await fetch(`/api/products/${id}`);
      const product = await response.json();
      document.getElementById('productId').value = product._id;
      document.getElementById('productName').value = product.name;
      document.getElementById('productDescription').value = product.description;
      document.getElementById('productPrice').value = product.price;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function deleteProduct(id) {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts();
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchProducts();
  