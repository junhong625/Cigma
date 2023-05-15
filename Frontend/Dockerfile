FROM centos/nginx-116-centos7

USER root
RUN yum -y install https://extras.getpagespeed.com/release-latest.rpm && yum -y install nginx-module-let

RUN mkdir /app
WORKDIR /app

RUN mkdir ./dist

ADD ./cigma/dist ./dist

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-enabled/default.conf /etc/nginx/conf.d