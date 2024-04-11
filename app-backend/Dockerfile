# Use the official Gradle image to create a build artifact
FROM gradle:8.2-jdk17 as builder
WORKDIR /app
# Give the gradle user ownership of the /app directory
USER root
RUN chown -R gradle:gradle /app
USER gradle
# Copy the Gradle project files into the Docker image
COPY --chown=gradle:gradle build.gradle settings.gradle ./
COPY --chown=gradle:gradle gradle gradle
COPY --chown=gradle:gradle src src
# Build the application, disable file system watching
RUN gradle clean build -x test --no-daemon --no-watch-fs

# Use the official OpenJDK image for running the application
FROM openjdk:17-jre-slim
# Copy the Spring Boot application JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar
# Expose the port the app runs on
EXPOSE 8081
# Run the application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]