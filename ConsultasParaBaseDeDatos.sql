-- Crear base de datos llamada "navegador"
CREATE DATABASE IF NOT EXISTS navegador;
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


SELECT * FROM navegador.users;

INSERT INTO users (name, email) VALUES
('Juan Pérez', 'juan.perez@example.com'),
('María López', 'maria.lopez@example.com');


SELECT * FROM navegador.search_queries;

INSERT INTO search_queries (user_id, query)
VALUES 
(1, 'Plataformas de redes sociales populares'),
(2, 'Servicios populares de Internet'); 

SELECT * FROM navegador.search_results;

-- Resultados de búsqueda para user_id 1 (search_id = 1)
INSERT INTO search_results (search_id, title, description, url) VALUES
(1, 'Facebook', 'Plataforma de redes sociales para conectarse con amigos, familiares, compartir contenido multimedia, y crear comunidades.', 'https://www.facebook.com'),
(1, 'Instagram', 'Red social centrada en la fotografía y el video, donde los usuarios pueden compartir contenido visual y seguir a otros.', 'https://www.instagram.com'),
(1, 'Twitter/X', 'Plataforma de microblogging y red social, que permite a los usuarios compartir mensajes breves, fotos y videos, y seguir tendencias globales.', 'https://www.twitter.com'),
(1, 'LinkedIn', 'Red social profesional orientada a la creación de redes laborales, búsqueda de empleo, y desarrollo de la marca personal.', 'https://www.linkedin.com'),
(1, 'TikTok', 'Plataforma de videos cortos y entretenimiento donde los usuarios crean y comparten clips de música, baile, humor, entre otros.', 'https://www.tiktok.com'),
(1, 'YouTube', 'Sitio de videos en línea que permite a los usuarios ver, compartir y subir contenido audiovisual, incluyendo tutoriales, reseñas y transmisiones en vivo.', 'https://www.youtube.com'),
(1, 'Snapchat', 'Aplicación de mensajería multimedia con características temporales que permite compartir fotos y videos que desaparecen tras ser vistos.', 'https://www.snapchat.com'),
(1, 'Pinterest', 'Red social visual que permite a los usuarios compartir y descubrir ideas creativas a través de imágenes y tableros temáticos.', 'https://www.pinterest.com'),
(1, 'Reddit', 'Comunidad de foros y discusiones en línea donde los usuarios pueden participar en una amplia gama de temas mediante publicaciones y comentarios.', 'https://www.reddit.com'),
(1, 'WhatsApp', 'Aplicación de mensajería instantánea que permite el envío de texto, fotos, videos, y llamadas de voz y video a nivel global.', 'https://www.whatsapp.com');

-- Resultados de búsqueda para user_id 2 (search_id = 2)
INSERT INTO search_results (search_id, title, description, url) VALUES
(2, 'Google', 'El motor de búsqueda más popular del mundo que ofrece una gran cantidad de servicios como búsquedas web, imágenes, noticias, mapas y más.', 'https://www.google.com'),
(2, 'Wikipedia', 'Enciclopedia en línea gratuita que es mantenida por una comunidad global de voluntarios y cubre una vasta cantidad de temas.', 'https://www.wikipedia.org'),
(2, 'Outlook', 'Servicio de correo electrónico y productividad de Microsoft que permite gestionar correos, calendarios y contactos.', 'https://www.outlook.com'),
(2, 'Gmail', 'Servicio de correo electrónico gratuito de Google, ampliamente utilizado y que ofrece integración con otros servicios de Google.', 'https://www.gmail.com');

