FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/

# Expose Django port
EXPOSE 8000

# Run Django setup commands and start Gunicorn
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py makemigrations --noinput && python manage.py migrate --noinput && gunicorn notes_backend.wsgi:application --bind 0.0.0.0:8000"]