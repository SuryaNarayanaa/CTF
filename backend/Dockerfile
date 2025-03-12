# Use Node.js v20.13.1 as base image
FROM node:20.13.1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy the rest of the backend code
COPY . .

# Expose the backend port (adjust if needed)
EXPOSE 3000

# Start the backend in development mode (or use a production start script)
CMD ["npm", "run", "dev"]