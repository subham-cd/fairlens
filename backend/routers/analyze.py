from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Header
from services import bias_engine, gemini_service, firebase_service, attribute_detector
import pandas as pd
import io
import json
import uuid
from datetime import datetime

router = APIRouter()

async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split("Bearer ")[1]
    decoded_token = firebase_service.verify_token(token)
    if not decoded_token:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return decoded_token

@router.post("")
async def analyze_dataset(
    file: UploadFile = File(...),
    domain: str = Form(...),
    sensitive_columns: str = Form(...),
    outcome_column: str = Form(...),
    user: dict = Depends(get_current_user)
):
    try:
        content = await file.read()
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid CSV file: {str(e)}")

    try:
        sensitive_cols = json.loads(sensitive_columns)
    except:
        sensitive_cols = [sensitive_columns]

    try:
        metrics = bias_engine.compute_bias_metrics(df, sensitive_cols, outcome_column)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Bias computation failed: {str(e)}")

    try:
        ai_analysis = gemini_service.run_gemini_analysis(
            domain=domain,
            dataset_summary=metrics["dataset_summary"],
            bias_metrics=metrics["bias_metrics"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis failed: {str(e)}")

    audit_id = str(uuid.uuid4())
    audit_record = {
        "audit_id": audit_id,
        "uid": user["uid"],
        "timestamp": datetime.now().isoformat(),
        "domain": domain,
        "dataset_name": file.filename,
        "sensitive_columns": sensitive_cols,
        "outcome_column": outcome_column,
        "dataset_summary": metrics["dataset_summary"],
        **ai_analysis,
        "raw_metrics": metrics
    }
    
    firebase_service.save_audit(user["uid"], audit_record)

    return audit_record

@router.get("/detect-sensitive")
async def detect_sensitive(columns: str):
    cols = columns.split(",")
    return attribute_detector.detect_sensitive_columns(cols)
