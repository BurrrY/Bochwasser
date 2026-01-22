# Verwende nginx als Basis-Image
FROM nginx:alpine

# Kopiere die Website-Dateien in das nginx html Verzeichnis
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Kopiere und setze das Entrypoint-Skript
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Exponiere Port 80
EXPOSE 80

# Verwende das Custom-Entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
