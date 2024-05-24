# Utiliza una imagen de Node.js para construir
FROM node:14-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Ahora copia todos los archivos (incluyendo node_modules) al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Utiliza una imagen más liviana para ejecutar la aplicación
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos construidos desde la fase de construcción anterior
COPY --from=build /app .

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]
