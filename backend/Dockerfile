# Base image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and TypeScript globally
RUN npm install && npm install -g typescript

# Copy rest of the code
COPY . .

# Build TS to JS files
RUN npm run build

# Expose port
EXPOSE 3000

# Start backend in production
CMD ["npm", "start"]

