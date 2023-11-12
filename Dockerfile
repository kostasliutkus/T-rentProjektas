FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /

ENV ASPNETCORE_URLS=http://+:8010

EXPOSE 8010

# copy csproj and restore as distinct layers
COPY TrentAPI/*.sln .
COPY TrentAPI/*.csproj ./TrentAPI/
# copy everything else and build app
COPY TrentAPI/. ./TrentAPI/

RUN dotnet restore

WORKDIR /app/TrentAPI
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
FROM base AS final
WORKDIR /app
COPY --from=build /app/TrentAPI/out ./
ENTRYPOINT ["dotnet", "TrentAPI.dll"]
