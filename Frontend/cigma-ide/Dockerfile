# bash image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

### GET GIT AND OTHER PACKAGE
RUN apt-get update && apt-get install --no-install-recommends -y apt-utils \
&& apt-get install --no-install-recommends -y git curl gnupg

### GET JAVA
RUN apt-get install --no-install-recommends -y ca-certificates-java \
&& apt-get install --no-install-recommends -y openjdk-11-jre-headless

### GET PYTHON, PIP
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys  C2518248EEA14886 \
&& apt-get install --no-install-recommends -y software-properties-common \
&& add-apt-repository ppa:deadsnakes/ppa \
&& apt-get update \
&& apt-get install --no-install-recommends -y python3.9

### GET NODEJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.15 | bash - && apt-get install --no-install-recommends -y nodejs npm build-essential \
    && rm -rf /var/lib/apt/lists/*

### MAKE ROOT DIR
RUN mkdir /cigma
WORKDIR /cigma

COPY . .

### START CIGMA-IDE SERVER
RUN npm install \
    && npm build \
    && rm -r node_modules

CMD ["npm", "run", "server"]