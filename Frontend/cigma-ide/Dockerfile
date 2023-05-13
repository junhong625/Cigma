# bash image
FROM ubuntu:22.04

# make root dir
RUN mkdir /cigma
WORKDIR /cigma

RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update && apt install -y git \
                                python3.10 \
                                openjdk-11-jdk \
                                curl
RUN curl -fsSL https://rpm.nodesource.com/setup_lts.15 | bash - && apt install -y nodejs build-essential

COPY . .