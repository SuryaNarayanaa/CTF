FROM node:20.13.1-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (including dev dependencies)
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend code
COPY . .

# Expose dev server port (adjust if your dev server uses a different port)
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
