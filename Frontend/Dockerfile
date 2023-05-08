FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./cigma/dist /var/www/html
COPY ./nginx/sites-enabled /etc/nginx/site-enabled