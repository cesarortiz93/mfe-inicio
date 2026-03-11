# ── Para mfe-inicio ──────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

ARG TOKEN_PAT

RUN dotnet nuget add source \
    https://nuget.pkg.github.com/cesarortiz93/index.json \
    --name github \
    --username cesarortiz93 \
    --password $TOKEN_PAT \
    --store-password-in-clear-text

COPY ["MFE.Inicio/MFE.Inicio.csproj", "MFE.Inicio/"]
 
RUN dotnet restore "MFE.Inicio/MFE.Inicio.csproj"
 
COPY . .

WORKDIR /src/MFE.Inicio
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MFE.Inicio.dll"]