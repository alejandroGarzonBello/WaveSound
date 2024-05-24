# Utiliza una imagen de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install --production

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]
