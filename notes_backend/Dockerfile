# # Use latest Python base image
# # FROM python:latest
# FROM python:3.11-slim


# # Prevent .pyc files, force stdout logging
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY requirements.txt /app/
# RUN pip install --upgrade pip && pip install -r requirements.txt

# # Copy project code
# COPY . /app/

# # Expose Django port
# EXPOSE 8000


# # Run Gunicorn as WSGI server
# CMD ["gunicorn", "notes_backend.wsgi:application", "--bind", "0.0.0.0:8000"]


FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh



CMD ["/app/entrypoint.sh"]
