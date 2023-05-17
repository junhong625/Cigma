import os
import docker
from fastapi import FastAPI, Response, status
from pydantic import BaseModel

client = docker.from_env()


class CreateModel(BaseModel):
    port: int
    teamName: str
    projectName: str


class DeleteModel(BaseModel):
    containerId: str


default_image = "caffeincoding/cigma-ide:latest"

app = FastAPI()


@app.get("/")
def info():
    return "this is cigma docker api"


@app.post("/docker/create")
async def create_container(createModel: CreateModel, response: Response):
    create_dict = createModel.dict()
    if create_dict == None or create_dict["teamName"] == "" or create_dict["project_name"] == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": 400}
    default_name = f'{create_dict["teamName"]}_{create_dict["project_name"]}'
    default_path = f'/home/ubuntu/canvas/{default_name}/workspace'
    main_port = f'{create_dict["port"]}/tcp'
    web_port = f'{create_dict["port"]+1}/tcp'
    server_port = f'{create_dict["port"]+2}/tcp'
    if not os.path.isdir(default_path):
        os.makedirs(default_path)
    try:
        container = await client.containers.create(default_image, volumes=[
            f'{default_path}:/cigma/workspace'], ports={main_port: '5000', web_port: '8080', server_port: '3000'})
    except:
        response.status_code = status.HTTP_409_CONFLICT
        return {"status": 409}
    response.status_code = status.HTTP_200_OK
    return {"containerId": container.id, "status": 200}


@app.post("/docker/delete")
async def delete_container(deleteModel: DeleteModel, response: Response):
    delete_dict = deleteModel.dict()
    if delete_dict == None or delete_dict["containerId"] == "":
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"status": 400}

    resConainerId = delete_dict["containerId"]
    try:
        container = await client.containers.get(resConainerId)
    except:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"status": 404}
    await container.stop()
    await container.remove()
    return {"status": 200}
