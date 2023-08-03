from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

items=['a','b','c']

class Item(BaseModel):
    id:int
    content:str

@app.get("/items")
def read_items():
    return items

# @app.get("/items/{id}")
# def read_id_items(id):
#     return items[int(id)]
# path방식

@app.get("/items")
def read_id_items(skip:int=0,limit:int=10):
    return items[skip:skip+limit]

@app.get("/")
def sayWelcome():
    return {"message":"환영합니다"}

@app.post("/items")
def post_item(item:Item):
    item.append(item.content)
    return '성공'