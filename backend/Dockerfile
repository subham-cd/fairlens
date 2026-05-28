FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Start using python directly to ensure our port logic in main.py is executed
CMD ["python", "main.py"]
