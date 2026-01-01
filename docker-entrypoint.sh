#!/bin/sh
set -e

# Generate the Umami analytics script if UMAMI_WEBSITE_ID is set
if [ -n "$UMAMI_WEBSITE_ID" ]; then
    UMAMI_SCRIPT="<script defer src=\"https://cloud.umami.is/script.js\" data-website-id=\"$UMAMI_WEBSITE_ID\"></script>"
else
    UMAMI_SCRIPT=""
fi

# Replace the placeholder in index.html
sed -i "s|<!-- UMAMI_ANALYTICS_SCRIPT -->|$UMAMI_SCRIPT|g" /usr/share/nginx/html/index.html

# Start nginx
exec nginx -g 'daemon off;'
