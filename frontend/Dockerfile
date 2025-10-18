#Base image
FROM node:20-alpine

#Set working directory
WORKDIR /app

#Copy package.json and package-lock.json
COPY package*.json ./

#Install dependiencies
RUN npm install

#Copy the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 5173


#Start the app
CMD ["npm","run","dev"]