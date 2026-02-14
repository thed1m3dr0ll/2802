from fastapi import FastAPI
from .yclients.routes import router as yclients_router

app = FastAPI()

app.include_router(yclients_router)
