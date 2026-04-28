import firebase_admin
from firebase_admin import credentials, auth, firestore
import os

import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
import json
import tempfile

# Check if initialized
if not firebase_admin._apps:
    # 1. Try JSON string from ENV (Best for Railway/Render)
    service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")
    
    if service_account_json:
        # Create a temporary file to hold the JSON
        with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
            f.write(service_account_json)
            temp_path = f.name
        cred = credentials.Certificate(temp_path)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized via ENV JSON string.")
    else:
        # 2. Fallback to file path
        cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "service-account.json")
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
            print(f"Firebase initialized via file: {cred_path}")
        else:
            print("WARNING: Firebase not initialized. Set FIREBASE_SERVICE_ACCOUNT env var.")
            # Last ditch effort
            try:
                firebase_admin.initialize_app()
            except: pass

db = firestore.client()

def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(f"Token verification failed: {str(e)}")
        return None

def save_audit(uid: str, audit_data: dict):
    audit_id = audit_data.get("audit_id")
    db.collection("users").document(uid).collection("audits").document(audit_id).set(audit_data)
    return audit_id

def get_audit(uid: str, audit_id: str):
    doc = db.collection("users").document(uid).collection("audits").document(audit_id).get()
    return doc.to_dict() if doc.exists else None

def get_all_audits(uid: str):
    audits = db.collection("users").document(uid).collection("audits").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
    return [a.to_dict() for a in audits]
