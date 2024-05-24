# Stage 1: Build the Spring Boot application
FROM maven:3.8.4-openjdk-17 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y el pom.xml
COPY pom.xml ./
COPY src ./src/

# Empaqueta la aplicación
RUN mvn clean package -DskipTests

# Stage 2: Ejecutar la aplicación Spring Boot
FROM openjdk:17-jre-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el JAR construido desde la fase de construcción anterior
COPY --from=build /app/target/waveSoundBack-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
