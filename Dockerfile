FROM nginx
COPY -r out /usr/share/nginx/html
EXPOSE 80
