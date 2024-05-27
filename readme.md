# Proyecto Node.js con MongoDB

## Docker

1. **Descargar imagen MongoDB:**

    ```bash
    docker pull mongo
    ```

2. **Arrancar la imagen de MongoDB:**

    ```bash
    docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
    ```

## Node.js

1. **Crear la carpeta del proyecto:**

    ```bash
    mkdir node-crud-app
    cd node-crud-app
    ```

2. **Inicializar un nuevo proyecto Node.js:**

    ```bash
    npm init -y
    ```

3. **Instalar las dependencias necesarias:**

    ```bash
    npm install express mongoose multer body-parser
    ```

4. **Estructura del proyecto:**

    ```
    node-crud-app/
    ├── models/
    │   └── item.js
    ├── routes/
    │   └── items.js
    ├── public/
    │   ├── index.html
    │   ├── style.css
    │   └── app.js
    ├── uploads/
    ├── .gitignore
    ├── app.js
    └── package.json
    ```

5. **Ejecutar el proyecto:**

    ```bash
    node app.js
    ```

## Estructura de los Archivos

### `models/item.js`

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema del item
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);
