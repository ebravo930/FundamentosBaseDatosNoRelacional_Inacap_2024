document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('itemId').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }
  
    try {
      let response;
      if (id) {
        response = await fetch(`/api/items/${id}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('/api/items', {
          method: 'POST',
          body: formData
        });
      }
  
      const result = await response.json();
      if (response.ok) {
        fetchItems();
        document.getElementById('itemForm').reset();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  async function fetchItems() {
    try {
      const response = await fetch('/api/items');
      const items = await response.json();
      const itemsList = document.getElementById('itemsList');
      itemsList.innerHTML = '';
      items.forEach(item => displayItem(item));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayItem(item) {
    const itemsList = document.getElementById('itemsList');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('col-md-4', 'mb-3');
    itemDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <a href="/${item.file}" target="_blank" class="btn btn-primary">Ver Archivo</a>
          <button class="btn btn-secondary mt-2" onclick="editItem('${item._id}')">Editar</button>
          <button class="btn btn-danger mt-2" onclick="deleteItem('${item._id}')">Eliminar</button>
        </div>
      </div>
    `;
    itemsList.appendChild(itemDiv);
  }
  
  async function editItem(id) {
    try {
      const response = await fetch(`/api/items/${id}`);
      const item = await response.json();
      document.getElementById('itemId').value = item._id;
      document.getElementById('name').value = item.name;
      document.getElementById('description').value = item.description;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function deleteItem(id) {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchItems();
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchItems();
  