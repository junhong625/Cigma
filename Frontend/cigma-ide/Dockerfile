# bash image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

### GET DEFAULT PACKAGE
RUN apt-get update && apt-get install --no-install-recommends -y apt-utils gnupg git curl

### GET JAVA AND PYTHON
RUN apt-get install --no-install-recommends -y openjdk-11-jre-headless python3.10 && ln -s /usr/bin/python3.10 /usr/bin/python

### GET NODEJS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install --no-install-recommends -y nodejs build-essential \
&& rm -rf /var/lib/apt/lists/*

### MAKE ROOT DIR
RUN mkdir -p /cigma/ide && mkdir -p /cigma/workspace
WORKDIR /cigma/ide

COPY . .

### START CIGMA-IDE SERVER
RUN npm install \
&& npm run build

CMD ["npm", "run", "server"]