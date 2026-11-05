# Blog Platform

Day 1 authentication practice for the Week 9 Blog Platform project.

## Run the practice script (Windows PowerShell)

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
$env:JWT_SECRET = "local-practice-secret-change-this"
python practice_auth.py
```

The script demonstrates bcrypt password hashing and verification, and creates
then decodes a JWT containing a user ID and expiration time. Use a private,
strong secret outside this local exercise; never commit secrets to GitHub.

## Day 1 learning notes

Passwords should be hashed because a secure password hash is one-way; a
database leak should not reveal users' original passwords. Bcrypt also uses a
salt, so equal passwords do not need to produce equal stored hashes.

A JWT contains a header, payload, and signature. This practice payload includes
the user ID (`sub`) and expiration (`exp`). A signed JWT is not encrypted, so
do not put passwords or other sensitive information in its payload.