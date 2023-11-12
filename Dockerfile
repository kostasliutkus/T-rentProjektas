# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /TrentAPI

# copy csproj and restore as distinct layers
COPY TRentAPI/*.csproj .
RUN dotnet restore -r linux-musl-x64 /p:PublishReadyToRun=true

<<<<<<< HEAD
# copy everything else and build app
COPY TrentAPI/. .
RUN dotnet publish -c Release -o /app -r linux-musl-x64 --self-contained true --no-restore /p:PublishReadyToRun=true /p:PublishSingleFile=true
=======
# Retrieve ASP.NET Core
RUN aspnetcore_version=6.0.1 \
    && curl -fSL --output aspnetcore.tar.gz https://dotnetcli.azureedge.net/dotnet/aspnetcore/Runtime/$aspnetcore_version/aspnetcore-runtime-$aspnetcore_version-linux-x64.tar.gz \
    && aspnetcore_sha512='b14ed20bb6c2897fb05cf11154aa22df3c68b6f90d2e9bc6ccc623897a565f51c3007c9a6edcdbab2090c710047a3d8eed0bcc6df19f3993d1be4c6387238da5' \
    && echo "$aspnetcore_sha512  aspnetcore.tar.gz" | sha512sum -c - \
    && tar -oxzf aspnetcore.tar.gz ./shared/Microsoft.AspNetCore.App \
    && rm aspnetcore.tar.gz
>>>>>>> 587ac3871c1fd299c37e1bd53c37480d418eeaf1

# final stage/image
FROM mcr.microsoft.com/dotnet/runtime-deps:6.0-alpine-amd64
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["./TrentAPI"]

<<<<<<< HEAD
# See: https://github.com/dotnet/announcements/issues/20
# Uncomment to enable globalization APIs (or delete)
ENV \
     DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
     LC_ALL=en_US.UTF-8 \
     LANG=en_US.UTF-8
 RUN apk add --no-cache \
     icu-data-full \
     icu-libs
=======
# ASP.NET Core image
FROM $REPO:6.0.1-focal-amd64

# ASP.NET Core version
ENV ASPNET_VERSION=6.0.1

COPY --from=installer ["/shared/Microsoft.AspNetCore.App", "/usr/share/dotnet/shared/Microsoft.AspNetCore.App"]
>>>>>>> 587ac3871c1fd299c37e1bd53c37480d418eeaf1
