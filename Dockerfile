FROM node:latest as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Build the API project
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build-api

WORKDIR /source

COPY TrentAPI/TrentAPI.csproj .
RUN dotnet restore -r linux-musl-x64 -p:PublishReadyToRun=true

COPY TrentAPI/. .
RUN dotnet publish -c Release -o /app/api -r linux-musl-x64 --self-contained true --no-restore /p:PublishReadyToRun=true /p:PublishSingleFile=true

# Final image
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64
WORKDIR /app

COPY --from=build-api /app/api .

COPY --from=build /app/dist /app/wwwroot

RUN apk add --no-cache nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod 644 /etc/nginx/nginx.conf

ENTRYPOINT ["./api"]
