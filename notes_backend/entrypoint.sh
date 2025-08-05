#!/bin/sh

python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput
exec gunicorn notes_backend.wsgi:application --bind 0.0.0.0:8000
