# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /TrentAPI

ENV ASPNETCORE_URLS=http://+:8010

EXPOSE 8010

# copy csproj and restore as distinct layers
COPY TrentAPI/*.sln .
COPY TrentAPI/*.csproj ./TrentAPI/
# copy everything else and build app
COPY TrentAPI/. ./TrentAPI/

WORKDIR /TrentAPI
RUN dotnet restore

WORKDIR /TrentAPI
RUN dotnet publish -c Release -o /app/out

# Stage 2: Deploy
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY --from=build /app .

ENTRYPOINT ["./TrentAPI"]
