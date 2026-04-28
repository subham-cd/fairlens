from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import analyze, report, history

app = FastAPI(title="FairLens API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze.router, prefix="/api/analyze", tags=["Analysis"])
app.include_router(report.router, prefix="/api/report", tags=["Reporting"])
app.include_router(history.router, prefix="/api/history", tags=["History"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
