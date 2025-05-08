# Use Node.js 18
FROM node:18
WORKDIR /app

# Install CA certificates (optional for local)
RUN apt-get update && apt-get install -y ca-certificates

# Disable strict SSL for npm (for local development only)
RUN npm config set strict-ssl false

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the db.js file from the backend folder
COPY ../../src/db.js ./db.js


# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]