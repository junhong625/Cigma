FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -r /etc/nginx/sites-enabled
COPY ./nginx/default-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-enabled /etc/nginx/sites-enabled
COPY ./cigma/dist /var/www/html