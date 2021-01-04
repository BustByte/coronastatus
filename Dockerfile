FROM nginx
EXPOSE 80
COPY static/ /usr/share/nginx/html/static
COPY goodbye.html /usr/share/nginx/html/index.html
