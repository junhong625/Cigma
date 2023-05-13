# bash image
FROM openjdk:11-slim

### GET GIT AND OTHER PACKAGE
RUN apt-get install -y git apt-utils curl

### GET PYTHON, PIP
RUN apt-get install -y software-properties-common \
&& add-apt-repository ppa:deadsnakes/ppa \
&& apt-get update \
&& apt-get install -y python3.9

### GET NODEJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.15 | bash - && apt-get install -y nodejs npm build-essential \
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