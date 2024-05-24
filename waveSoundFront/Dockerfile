# Stage 1: Build the Angular application
FROM node:22 as build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Stage 2: Serve the Angular application from Nginx Server
FROM nginx:1.25.5-alpine

# Copia los archivos de construcción desde la fase de build
COPY --from=build /usr/src/app/dist/waveSoundFront /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
