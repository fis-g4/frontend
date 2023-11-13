# Use an official Node.js runtime as the base image
FROM node:21.1-slim

# Set the working directory in the container
WORKDIR /usr/src/client

# Copy the rest of the application source code to the container
COPY ./client .

# Install Node.js dependencies
RUN npm install

# Define a default environment variable if not provided during runtime
RUN mv .env.prod .env

# Expose a port if your React app runs a server (e.g., for development purposes)
# EXPOSE 3000

# Build your React application (you can customize the build command)
RUN npm install -g serve

RUN npm run build
