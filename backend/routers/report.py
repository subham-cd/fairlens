from fastapi import APIRouter, Depends, HTTPException, Header, Response
from services import firebase_service, pdf_generator

router = APIRouter()

async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    token = authorization.split("Bearer ")[1]
    decoded_token = firebase_service.verify_token(token)
    if not decoded_token:
        raise HTTPException(status_code=401, detail="Invalid token")
    return decoded_token

@router.get("/{audit_id}")
async def get_report(audit_id: str, user: dict = Depends(get_current_user)):
    audit = firebase_service.get_audit(user["uid"], audit_id)
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")
    return audit

@router.get("/{audit_id}/pdf")
async def get_pdf_report(audit_id: str, user: dict = Depends(get_current_user)):
    audit = firebase_service.get_audit(user["uid"], audit_id)
    if not audit:
        raise HTTPException(status_code=404, detail="Audit not found")
    
    pdf_bytes = pdf_generator.generate_pdf_report(audit)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=FairLens_Audit_{audit_id}.pdf"
        }
    )
