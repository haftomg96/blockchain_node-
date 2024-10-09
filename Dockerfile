# Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build  # Ensure this creates the dist folder

# Start the application
CMD ["node", "dist/main"]