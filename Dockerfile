FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG TARGETARCH
WORKDIR /Trent-api

# copy csproj and restore as distinct layers
COPY Trent-api/*.csproj .
RUN dotnet restore -a $TARGETARCH

# copy and publish app and libraries
COPY Trent-api/. .
RUN dotnet publish -a $TARGETARCH --no-restore -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["./Trent-api"]