INDIA_SENSITIVE_KEYWORDS = {
    "gender": ["gender", "sex"],
    "caste": ["caste", "category", "community", "sc", "st", "obc"],
    "religion": ["religion", "faith"],
    "language": ["language", "mother_tongue", "tongue"],
    "location": ["pin", "pincode", "city", "state", "district", "urban", "rural", "region"],
    "age": ["age", "dob", "birth_year"],
}

def detect_sensitive_columns(columns: list) -> list:
    detected = []
    for col in columns:
        col_lower = col.lower().replace("-", "_").replace(" ", "_")
        for category, keywords in INDIA_SENSITIVE_KEYWORDS.items():
            if any(kw in col_lower for kw in keywords):
                detected.append({"column": col, "category": category})
                break
    return detected
