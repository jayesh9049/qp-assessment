# Use an official Node runtime as a base image
FROM node:18.19.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

# Install TypeScript globally
RUN npm install -g typescript


# Copy the local code to the container
COPY . .

# Expose the port that your app runs on
EXPOSE 5000

# Define the command to run your application
CMD ["npm", "start"]
