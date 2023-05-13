# bash image
FROM ubuntu:22.04

# make root dir
RUN mkdir /cigma
WORKDIR /cigma

RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update && apt-get install -y git \
                                python3.9 \
                                openjdk-11-jdk \
                                curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs build-essential

COPY . .