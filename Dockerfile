# Verwende nginx als Basis-Image
FROM nginx:alpine

# Kopiere die Website-Dateien in das nginx html Verzeichnis
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Exponiere Port 80
EXPOSE 80

# nginx startet automatisch durch das Base-Image
