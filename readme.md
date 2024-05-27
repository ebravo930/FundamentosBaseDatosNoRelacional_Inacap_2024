# Proyecto Node.js con MongoDB

## Docker

### Descripción
Docker se utiliza para crear contenedores livianos y portátiles para tus aplicaciones. En este proyecto, Docker se utiliza para ejecutar una instancia de MongoDB, lo que facilita la configuración y el despliegue de la base de datos sin preocuparse por las dependencias del sistema.

### Pasos

1. **Descargar imagen MongoDB:**

    ```bash
    docker pull mongo
    ```

2. **Arrancar la imagen de MongoDB:**

    ```bash
    docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
    ```

## Node.js

### Descripción
Node.js es un entorno de ejecución para JavaScript que te permite construir aplicaciones del lado del servidor. En este proyecto, se utiliza Node.js junto con Express para crear un servidor que maneja operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con archivos y MongoDB como base de datos.

### Pasos

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