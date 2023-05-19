FROM nginx:latest

ARG DISABLE_CACHE

RUN mkdir /app
WORKDIR /app

RUN mkdir ./dist


ADD ./cigma/dist ./dist

RUN rm /etc/nginx/conf.d/default.conf

ARG DISABLE_CACHE

COPY ./nginx/default-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-enabled/default.conf /etc/nginx/conf.d
# COPY ./nginx/sites-enabled/subDomain.conf /etc/nginx/conf.d