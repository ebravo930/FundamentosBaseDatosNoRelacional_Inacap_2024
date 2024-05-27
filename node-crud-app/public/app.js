document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const file = document.getElementById('file').files[0];
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        displayItem(result);
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
        </div>
      </div>
    `;
    itemsList.appendChild(itemDiv);
  }
  
  fetchItems();
  
  