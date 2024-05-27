document.getElementById('personForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('personId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const photo = document.getElementById('photo').files[0];
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('photo', photo);
  
    try {
      let response;
      if (id) {
        response = await fetch(`/api/persons/${id}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('/api/persons', {
          method: 'POST',
          body: formData
        });
      }
  
      const result = await response.json();
      if (response.ok) {
        fetchPersons();
        document.getElementById('personForm').reset();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value;
    fetchPersons(query);
  });
  
  async function fetchPersons(query = '') {
    try {
      const response = await fetch(`/api/persons?q=${query}`);
      const persons = await response.json();
      const personList = document.getElementById('personList');
      personList.innerHTML = '';
      persons.forEach(person => displayPerson(person));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displayPerson(person) {
    const personList = document.getElementById('personList');
    const personDiv = document.createElement('div');
    personDiv.classList.add('col-md-4', 'mb-3');
    personDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <p class="card-text">Edad: ${person.age}</p>
          <img src="/${person.photo}" class="img-fluid" alt="${person.name}">
          <button class="btn btn-secondary mt-2" onclick="editPerson('${person._id}')">Editar</button>
          <button class="btn btn-danger mt-2" onclick="deletePerson('${person._id}')">Eliminar</button>
        </div>
      </div>
    `;
    personList.appendChild(personDiv);
  }
  
  async function editPerson(id) {
    try {
      const response = await fetch(`/api/persons/${id}`);
      const person = await response.json();
      document.getElementById('personId').value = person._id;
      document.getElementById('name').value = person.name;
      document.getElementById('age').value = person.age;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function deletePerson(id) {
    try {
      const response = await fetch(`/api/persons/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPersons();
      } else {
        const result = await response.json();
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchPersons();
  