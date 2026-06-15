# 🛒 Fake Store API (RESTful Backend)

Una potente **API RESTful** construida en **Node.js** y **Express** que modela el backend de una tienda virtual (E-commerce). Cuenta con autenticación y autorización segura basada en **JSON Web Tokens (JWT)**, gestión de roles de usuarios (cliente y administrador), CRUD de productos y una lógica de carrito de compras completamente validada con control de stock de inventario.

---

### 🛠️ Tecnologías y Herramientas Utilizadas

<p align="left">
  <a href="https://nodejs.org" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node" />
  </a>
  <a href="https://expressjs.com" target="_blank">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  </a>
  <a href="https://www.postgresql.org" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
  <a href="https://jwt.io" target="_blank">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  </a>
  <a href="https://www.docker.com" target="_blank">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </a>
  <a href="https://www.postman.com" target="_blank">
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
  </a>
</p>

---

### 🚀 Características Principales

*   🔒 **Autenticación Segura:** Sistema robusto de registro y login de usuarios con hashing de contraseñas mediante **bcrypt**.
*   🔑 **Autorización por Roles:** Middleware para la verificación de roles (`user` / `admin`). Ciertas rutas de administración (como inserción y eliminación de productos) están completamente restringidas.
*   📦 **Gestión de Inventario (CRUD):** Endpoints para consultar productos por ID o de manera general, además de creación y eliminación protegidas para administradores.
*   🛒 **Carrito de Compras Inteligente:** Lógica compleja que verifica el stock disponible del producto antes de agregarlo o modificar su cantidad en el carrito, asegurando que un usuario no pueda comprar más unidades de las existentes.
*   🛡️ **Seguridad Avanzada (OWASP):** Las consultas de obtención de datos no exponen hashes de contraseñas y las modificaciones de carrito verifican la pertenencia de los recursos (evitando vulnerabilidades BOLA).

---

### 📦 Configuración e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/SoyEdu15/FAKE-SOTORE.git
    cd FAKE-SOTORE
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno (`.env`):**
    Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
    ```env
    PORT=3000
    DATABASE_URL=postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_base_datos
    JWT_SECRET=tu_palabra_secreta_super_segura
    ```

4.  **Inicializar Base de Datos:**
    Utiliza el archivo [schema.sql](schema.sql) adjunto en el proyecto para crear las tablas necesarias (`users`, `products`, `cart`) y sembrar datos iniciales de prueba (incluye usuarios de prueba `admin` y `user`).

5.  **Iniciar el Servidor:**
    *   Para producción: `npm start`
    *   Para desarrollo (con reinicio automático): `npm run dev`

---

### 📋 Documentación Técnica de Endpoints

#### 1. Autenticación y Cuentas (`/auth`)

*   **POST `/auth/register` (Público)**
    *   *Descripción:* Registra un nuevo usuario en la base de datos.
    *   *Cuerpo (JSON):*
        ```json
        {
          "username": "eduard",
          "password": "mi_password_segura",
          "role": "user" // O 'admin'
        }
        ```
*   **POST `/auth/login` (Público)**
    *   *Descripción:* Inicia sesión y genera un token Bearer para peticiones autenticadas.
    *   *Cuerpo (JSON):*
        ```json
        {
          "username": "eduard",
          "password": "mi_password_segura"
        }
        ```
    *   *Respuesta Exitosa:*
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

---

#### 2. Productos (`/products`)

*   **GET `/products` (Público)**
    *   *Descripción:* Obtiene la lista completa de todos los productos disponibles.
*   **GET `/products/:id` (Público)**
    *   *Descripción:* Obtiene la información detallada de un producto por su ID.
*   **POST `/products` (Solo Admin - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Cuerpo (JSON):*
        ```json
        {
          "name": "Teclado Gamer Mecánico",
          "description": "Retroiluminado, switches blue",
          "category": "Periféricos",
          "price": 89.99,
          "stock": 10,
          "imageUrl": "https://example.com/teclado.jpg"
        }
        ```
*   **DELETE `/products/:id` (Solo Admin - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Elimina un producto de la base de datos por su ID.

---

#### 3. Carrito de Compras (`/cart`)

*   **GET `/cart` (Autenticado - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Retorna los productos agregados en el carrito del usuario autenticado actual.
*   **POST `/cart` (Autenticado - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Agrega un producto al carrito de compras validando disponibilidad de stock.
    *   *Cuerpo (JSON):*
        ```json
        {
          "product_id": 2,
          "quantity": 1
        }
        ```
*   **PUT `/cart` (Autenticado - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Actualiza la cantidad de un artículo existente en el carrito.
    *   *Cuerpo (JSON):*
        ```json
        {
          "product_id": 2,
          "quantity": 3
        }
        ```
*   **DELETE `/cart/:cartId` (Autenticado - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Elimina una línea de producto del carrito por su ID de registro.

---

#### 4. Usuarios de Sistema (`/users` - Solo Admin)

*   **GET `/users` (Solo Admin - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Lista todos los usuarios registrados (excluye hashes de contraseñas).
*   **GET `/users/:username` (Solo Admin - Requiere Token)**
    *   *Headers:* `Authorization: Bearer <token>`
    *   *Descripción:* Obtiene datos detallados de un usuario específico.

---

### 💬 ¡Conversemos!

<p align="left">
  <a href="mailto:eduardmurillo3@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://wa.me/573204732202" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" />
  </a>
</p>

---
<p align="center">Construido con dedicación por <strong>Eduard Murillo</strong> 🚀</p>
