# bash image
FROM node:18.15-slim

# make root dir
RUN mkdir /cigma
WORKDIR /cigma

RUN apt-get update && apt-get install software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y git \
                                        python3.10 \
                                        openjdk-11-jdk

COPY . .