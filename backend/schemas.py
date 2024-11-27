from pydantic import BaseModel
from typing import List, Optional
import datetime
import enum

# Schema para os produtos
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

class Product(ProductBase):
    id: int
    category_id: int

    class Config:
        from_attributes = True

# Schema para as categorias
class CategoryBase(BaseModel):
    name: str

class Category(CategoryBase):
    id: int
    products: List[Product] = []  # Lista de produtos na categoria

    class Config:
        from_attributes = True

# Schemas para usuário e pedidos (como configurado anteriormente)
class UserBase(BaseModel):
    name: str
    email: str
    address: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class OrderStatusEnum(str, enum.Enum):
    pending = "pending"
    preparing = "preparing"
    on_the_way = "on_the_way"
    delivered = "delivered"

class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: float

class Order(BaseModel):
    id: int
    user_id: int
    total: float
    status: OrderStatusEnum
    address: str
    created_at: datetime.datetime
    items: List[OrderItem] = []

    class Config:
        from_attributes = True