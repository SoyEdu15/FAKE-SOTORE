-- ==========================================
-- ESTRUCTURA DE LA BASE DE DATOS: FAKE-STORE
-- ==========================================

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    image_url TEXT
);

-- 3. Tabla del Carrito de Compras
CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE(user_id, product_id)
);

-- ==========================================
-- DATOS SEMILLA (SEED DATA) DE PRUEBA
-- ==========================================

-- Usuarios de Prueba (Contraseña de ambos: 'admin123' y 'user123' respectivamente, hasheadas con bcrypt)
INSERT INTO users (username, password, role) 
VALUES 
('admin', '$2a$10$T8VqU8uF27Y5u57Q6WkQ5eHk8U1x7LzQG7iF6tLgJq3lVvXzW4K2y', 'admin'),
('user', '$2a$10$8C3dZ/Z8GqQ0bBvGf.Kbe.7/C.nK38VlU38D5fV82B2.c0.u5nSfe', 'user')
ON CONFLICT (username) DO NOTHING;

-- Productos Iniciales de la Tienda
INSERT INTO products (name, description, category, price, stock, image_url)
VALUES 
('Laptop Gamer ASUS ROG', 'Procesador Intel i7, 16GB de memoria RAM, tarjeta gráfica RTX 4060 y SSD de 1TB.', 'Electrónica', 1299.99, 10, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación activa de ruido líder en la industria, 30 horas de batería.', 'Audio', 249.99, 25, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
('Teclado Mecánico Keychron K2', 'Teclado inalámbrico Bluetooth con switches mecánicos Gateron Brown y retroiluminación RGB.', 'Periféricos', 99.99, 15, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'),
('Mouse Logitech MX Master 3S', 'Mouse inalámbrico de alta precisión con rueda de desplazamiento MagSpeed y diseño ergonómico.', 'Periféricos', 109.99, 30, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7')
ON CONFLICT DO NOTHING;
