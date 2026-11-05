from fastapi import FastAPI

app = FastAPI(title="Blog Platform API")


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Blog Platform API is running"}
