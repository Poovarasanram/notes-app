FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Ensure proper file watching inside Docker (especially for Windows/WSL)
ENV CHOKIDAR_USEPOLLING=true

# Run Vite development server
CMD ["npm", "run", "dev"]
