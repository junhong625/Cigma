import os
import docker
from fastapi import FastAPI, Response, status
from pydantic import BaseModel

client = docker.from_env()


class CreateModel(BaseModel):
    port: str
    teamName: str
    projectName: str


class DeleteModel(BaseModel):
    containerId: str


default_image = "caffeincoding/cigma-ide"
client.images.pull(default_image)

app = FastAPI()


@app.get("/")
def info():
    return "this is cigma docker api"


@app.post("/ide/create")
def create_container(createModel: CreateModel, response: Response):
    create_dict = createModel.dict()
    print(create_dict)
    if create_dict == None or create_dict["teamName"] == "" or create_dict["projectName"] == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": 400}
    default_name = f'{create_dict["teamName"]}_{create_dict["projectName"]}'
    default_path = f'/home/ubuntu/canvas/{default_name}/workspace'
    main_port = '5000/tcp'
    web_port = '8080/tcp'
    server_port = '3000/tcp'
    if not os.path.isdir(default_path):
        os.makedirs(default_path)
    try:
        container = client.containers.create(default_image, volumes=[
            f'{default_path}:/cigma/workspace'], ports={main_port: create_dict["port"], web_port: f'{int(create_dict["port"])+1}', server_port: f'{int(create_dict["port"])+2}'})
        print("container_create")
        container.start()
        print("container_start")
    except Exception as e:
        print(e)
        response.status_code = status.HTTP_409_CONFLICT
        return {"msg": e, "status": 409}
    response.status_code = status.HTTP_200_OK
    return {"containerId": container.id, "status": 200}


@app.post("/ide/delete")
def delete_container(deleteModel: DeleteModel, response: Response):
    delete_dict = deleteModel.dict()
    if delete_dict == None or delete_dict["containerId"] == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": 400}

    resConainerId = delete_dict["containerId"]
    try:
        container = client.containers.get(resConainerId)
    except Exception as e:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"msg": e, "status": 404}
    container.stop()
    container.remove()
    return {"status": 200}
