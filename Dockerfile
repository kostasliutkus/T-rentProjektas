WORKDIR /Trent-api

# copy csproj and restore as distinct layers
COPY Trent-api/*.csproj .
RUN dotnet restore

# copy and publish app and libraries
COPY Trent-api/. .
RUN dotnet publish --no-restore -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["./Trent-api"]