FROM python:3.8.10-slim

### WITH USER
# RUN adduser -D cigma
# USER cigma
# WORKDIR /home/cigma
# 

### JUST ROOT
WORKDIR /app
ADD . .

### GET PIP, DOCKER-SDK, FASTAPI, GUNICORN, UVICORN
RUN apt-get update \
&& apt-get install --no-install-recommends -y python3-pip \
&& pip install --no-cache-dir docker fastapi uvicorn gunicorn

CMD ["gunicorn", "-b", "localhost:3000", "--workers", "2", "main:app", "--worker-class uvicorn.workers.UvicornWorker"]
