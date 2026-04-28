from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class AuditBase(BaseModel):
    domain: str
    dataset_name: str
    sensitive_columns: List[str]
    outcome_column: str

class AuditCreate(AuditBase):
    pass

class Audit(AuditBase):
    audit_id: str
    uid: str
    timestamp: datetime
    overall_bias_score: int
    severity: str
    summary: str
    compliance_status: str
    result_data: Dict # Full JSON from Gemini
