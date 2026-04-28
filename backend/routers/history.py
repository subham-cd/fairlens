from fastapi import APIRouter, Depends, HTTPException, Header
from services import firebase_service

router = APIRouter()

async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split("Bearer ")[1]
    decoded_token = firebase_service.verify_token(token)
    if not decoded_token:
        raise HTTPException(status_code=401, detail="Invalid token")
    return decoded_token

@router.get("")
async def get_history(user: dict = Depends(get_current_user)):
    return firebase_service.get_all_audits(user["uid"])
