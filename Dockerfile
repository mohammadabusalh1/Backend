# Use Node.js as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all other files
COPY . .

# Build React app
# RUN npm run build

# Expose port
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]
