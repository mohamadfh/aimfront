# Stage 1: Build the React app
FROM node:20-alpine as build

# Accept the API URL as a build argument
ARG REACT_APP_API_URL

# Set the build argument as an environment variable for the build process
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# The environment variable will be injected during the build process
RUN yarn build

# Stage 2: Setup Nginx to serve the React app
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Replace the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
