import os
from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ["JWT_SECRET"]
ALGORITHM = "HS256"

password = "MyPracticePassword123!"
hashed_password = pwd_context.hash(password)

print("Password verified:", pwd_context.verify(password, hashed_password))
print("Wrong password verified:", pwd_context.verify("wrong-password", hashed_password))

user_id = 123
payload = {
    "sub": str(user_id),
    "exp": datetime.now(timezone.utc) + timedelta(minutes=30),
}

token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

print("JWT:", token)
print("Decoded user ID:", decoded["sub"])