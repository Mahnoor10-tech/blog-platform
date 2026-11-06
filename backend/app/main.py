from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, posts, users

app = FastAPI(title="Blog Platform API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Blog Platform API is running"}
