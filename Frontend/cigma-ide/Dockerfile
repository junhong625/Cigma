# bash image
FROM node:18.15-alpine

# make root dir
RUN mkdir /cigma
WORKDIR /cigma

RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y git \
                                        python3.10 \
                                        openjdk-11-jdk

COPY . .