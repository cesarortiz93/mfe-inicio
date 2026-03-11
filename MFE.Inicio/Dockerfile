# ── Para mfe-inicio ──────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
 
COPY ["MFE.Inicio/MFE.Inicio.csproj", "MFE.Inicio/"]
COPY ["nuget.config", "."]
 
RUN dotnet restore "MFE.Inicio/MFE.Inicio.csproj"
 
COPY . .
 
RUN dotnet publish "MFE.Inicio/MFE.Inicio.csproj" \
    -c Release \
    -o /app/publish
 
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8081
 
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MFE.Inicio.dll"]
 