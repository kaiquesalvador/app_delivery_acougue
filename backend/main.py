from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas
from backend.database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from typing import List
# Cria o banco de dados
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/categories/")
async def get_categories():
    return [
        {
            "id": 1,
            "name": "Promoções",
            "products": [
                {
                    "id": 1,
                    "name": "Kit Hamburguer",
                    "description": "4 blends de 150g cada, 4 pães de hambúrguer, 8 fatias de bacon, 8 fatias de queijo",
                    "price": 44.99,
                    "original_price": 59.99,
                    "discount": 25,
                    "image": "https://link-para-imagem-do-produto.jpg"
                },
                {
                    "id": 2,
                    "name": "4 Blends de Hamburguer",
                    "description": "4 unidades de 150g",
                    "price": 29.99,
                    "original_price": None,
                    "discount": None,
                    "image": "https://link-para-outra-imagem-do-produto.jpg"
                },
            ]
        },
        {
            "id": 2,
            "name": "Bife Ancho",
            "products": [
                {
                    "id": 3,
                    "name": "Bife Ancho 500g",
                    "description": "Corte de carne nobre, ideal para grelhados.",
                    "price": 39.99,
                    "original_price": None,
                    "discount": None,
                    "image": "https://link-para-imagem-do-bife-ancho.jpg"
                }
            ]
        },
        # Outras categorias e produtos
    ]