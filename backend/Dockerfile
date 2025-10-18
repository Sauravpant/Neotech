# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install && npm install -g nodemon

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Start backend
CMD ["npm", "run", "dev"]
