# bash image
FROM ubuntu:22.04

# make root dir
RUN mkdir /cigma
WORKDIR /cigma

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update && apt-get install -y software-properties-common apt-utils \
    add-apt-repository ppa:deadsnakes/ppa \
    apt-get update && apt-get install -y git \
                                python3.9 \
                                openjdk-11-jdk \
                                curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs npm build-essential \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install \
    npm build \
    rm -r node_modules

CMD ["npm", "run", "server"]