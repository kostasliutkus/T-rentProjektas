# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /source

# Copy csproj and restore as distinct layers
COPY source/TrentAPI/*.csproj .
RUN dotnet restore -r linux-musl-x64 /p:PublishReadyToRun=true

# Copy everything else and build the API
COPY source/TrentAPI/. .
RUN dotnet publish -c Release -o /app/api -r linux-musl-x64 --self-contained true --no-restore /p:PublishReadyToRun=true /p:PublishSingleFile=true

# Switch back to the source directory
WORKDIR /source

# Copy the Angular project
COPY source/Trent-web /app/web

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Build the Angular project
WORKDIR /app/web
RUN npm install
RUN npm run build

# Final Stage
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64
WORKDIR /app

# Copy the API from the build stage
COPY --from=build /app/api .

# Copy the Angular project from the build stage
COPY --from=build /app/web/dist /app/web

# Set up web server to serve Angular app
RUN apk add --no-cache nginx
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["./TRentAPI"]
