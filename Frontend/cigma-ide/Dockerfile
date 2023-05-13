# bash image
FROM node:18.15-slim

### GET JAVA
RUN apt-get update && apt-get install -y openjdk-11-jre-headless


### GET PYTHON, PIP
RUN apt-get install -y software-properties-common apt-utils \
&& add-apt-repository ppa:deadsnakes/ppa \
&& apt-get update \
&& apt-get install -y python3.9

### GET GIT
RUN apt-get install -y git

### MAKE ROOT DIR
RUN mkdir /cigma
WORKDIR /cigma

COPY . .

### START CIGMA-IDE SERVER
RUN npm install \
    && npm build \
    && rm -r node_modules

CMD ["npm", "run", "server"]