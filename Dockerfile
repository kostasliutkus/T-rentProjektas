# Build Angular app
FROM node:16 as build-angular
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY source/Trent-web/package.json .
COPY source/Trent-web/package-lock.json .

# Print the directory structure
RUN ls -al

# Install Angular dependencies
RUN npm install

# Print the directory structure again
RUN ls -al

# Copy the entire Angular project
COPY source/Trent-web .

# Print the directory structure once more
RUN ls -al

# Build the Angular app
RUN npm run build

# Build API project
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build-api
WORKDIR /source

# Copy csproj and restore as distinct layers
COPY source/TrentAPI/*.csproj .
RUN dotnet restore -r linux-musl-x64 /p:PublishReadyToRun=true

# Copy everything else and build the API
COPY source/TrentAPI/. .
RUN dotnet publish -c Release -o /app/api -r linux-musl-x64 --self-contained true --no-restore /p:PublishReadyToRun=true /p:PublishSingleFile=true

# Final image
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64
WORKDIR /app

# Copy the API from the build stage
COPY --from=build-api /app/api .

# Print the directory structure
RUN ls -al

# Copy the Angular build files
COPY --from=build-angular /app/dist /app/wwwroot

# Print the directory structure once more
RUN ls -al

# Set up web server to serve Angular app
RUN apk add --no-cache nginx

# Print the directory structure once more
RUN ls -al

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Adjust permissions to allow Nginx to read the configuration file
RUN chmod 644 /etc/nginx/nginx.conf

# Print the directory structure once more
RUN ls -al

ENTRYPOINT ["./TRentAPI"]
