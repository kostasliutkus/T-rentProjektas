# Use the official .NET SDK image for the build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# Copy the solution file and restore as distinct layers
COPY *.sln .
COPY Trent-api/*.csproj ./Trent-api/
RUN dotnet restore

# Copy the entire project and build the application
COPY Trent-api/. ./Trent-api/
WORKDIR /source/Trent-api
RUN dotnet publish -c Release -o /app --no-restore /p:PublishReadyToRun=true /p:PublishSingleFile=true

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["./Trent-api"]