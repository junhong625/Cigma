FROM caffeincoding/cigma-nginx-base:beta

RUN mkdir /app
WORKDIR /app

RUN mkdir ./dist

ADD ./cigma/dist ./dist

# RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-enabled/default.conf /etc/nginx/conf.d