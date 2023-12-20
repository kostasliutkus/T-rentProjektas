# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copy the source code for the C# backend
COPY ./source/trentAPI ./trentAPI

# Build the backend
WORKDIR /app/trentAPI
RUN dotnet publish -c Release -o /app/out

# Angular build stage
FROM node:10.1 AS client
WORKDIR /client

# Copy Angular app files
COPY ./source/trent-web .

# Install dependencies and build
RUN npm install
RUN npm run build

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app

# Copy the backend binaries from the build stage
COPY --from=build /app/out .

# Copy the built Angular app to the container
COPY --from=client /client/dist/trent-web ./wwwroot

# Expose the port that your combined app will run on
EXPOSE 80

# Command to run the combined app
ENTRYPOINT ["dotnet", "trentAPI.dll"]
