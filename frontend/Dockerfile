# Use Node.js v20.13.1 as base image
FROM node:20.13.1

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port Vite uses (here, assumed 5173)
EXPOSE 5173

# Start the frontend dev server
CMD ["npm", "run", "dev"]