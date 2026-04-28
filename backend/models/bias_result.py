from pydantic import BaseModel
from typing import List, Dict, Any

class AffectedGroup(BaseModel):
    group: str
    plain_finding: str
    severity: str
    metric_name: str
    metric_value: float

class FixSuggestion(BaseModel):
    priority: int
    fix_type: str
    title: str
    description: str
    technical_detail: str

class BiasAnalysisResult(BaseModel):
    overall_bias_score: int
    severity: str
    summary: str
    affected_groups: List[AffectedGroup]
    root_cause: str
    india_regulation_risk: str
    fixes: List[FixSuggestion]
    compliance_status: str
    audit_trail_note: str
