from fastapi import FastAPI

from app.routes import auth, users

app = FastAPI(title="Blog Platform API")
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Blog Platform API is running"}
