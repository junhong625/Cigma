# bash image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

### GET DEFAULT PACKAGE
RUN apt-get update && apt-get install --no-install-recommends -y apt-utils gnupg git curl

### GET JAVA
RUN mkdir -p /etc/ssl/certs/java/cacerts \
&& apt-get install --no-install-recommends -y openjdk-11-jre-headless

### GET PYTHON, PIP
RUN apt-get install --no-install-recommends -y python3.10

### GET NODEJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install --no-install-recommends -y nodejs build-essential \
    && rm -rf /var/lib/apt/lists/*

### MAKE ROOT DIR
RUN mkdir /cigma
WORKDIR /cigma

COPY . .

### START CIGMA-IDE SERVER
RUN npm install \
&& npm run build \
&& rm -r node_modules

CMD ["npm", "run", "server"]