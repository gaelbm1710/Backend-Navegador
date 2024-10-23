
CREATE DATABASE IF NOT EXISTS navegador;

-- Usar la base de datos navegador
USE navegador;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE search_queries (
    search_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    query VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE search_results (
    result_id INT AUTO_INCREMENT PRIMARY KEY,
    search_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    CONSTRAINT fk_search_id FOREIGN KEY (search_id) REFERENCES search_queries(search_id) ON DELETE CASCADE
);
