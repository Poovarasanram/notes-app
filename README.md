# 📝 Notes App - Full Stack Project

# Project Overview

This is a full-stack Notes Management App built with Django REST Framework and React (Vite).
It supports JWT-based authentication, role-based access (Admin/User), and CRUD operations on notes with a modern UI using Ant Design.

This is a full-stack Notes Management Application built with:

- ⚙️ **Backend**: Django + Django REST Framework + JWT Authentication
- 💻 **Frontend**: React (Vite.js) + Ant Design UI
- 🐳 **Deployment**: Docker + Docker Compose


---

## 🚀 Features

- ✅ JWT Authentication (Login/Register)
- ✅ Role-based access (Admin/User)
- ✅ Create, Read, Update, Delete Notes
- ✅ Pagination
- ✅ Ant Design components (form, table, modal, spinner)
- ✅ Token stored securely in `localStorage`

---

## 📁 Folder Structure

notes-app-fullstack/
├── notes_backend/ # Django backend (API)
├── notes_frontend/ # React frontend (Vite)
├── docker-compose.yml
└── README.md



---

## ⚙️ Setup Instructions

### 📌 Requirements

- Docker & Docker Compose installed
- Git installed

---




## 🐳 Run with Docker🐳 Docker Compose Usage Guide - Notes App
This document explains how to run the full-stack Notes App using Docker Compose.


1. 📦 What is Docker Compose?
Docker Compose helps you run multiple services (Django backend, React frontend, PostgreSQL, Nginx) using a single file. You define the setup in docker-compose.yml and run all containers together.


2. ⚙️ Prerequisites
✅ Make sure you have the following installed:
•	- Docker Desktop (or Docker Engine)
•	- Docker Compose
•	- Git (to clone the project)

3. 📥 Clone the Project
Run the following commands in your terminal:
git clone https://github.com/your-username/notes-app-fullstack.git
cd notes-app-fullstack

4. 🐳 Start Docker Engine
- On Windows/Mac: Open Docker Desktop
- On Linux:
sudo systemctl start docker

5. 🚀 Run with Docker Compose
From the root project folder (where docker-compose.yml is located), run:
docker-compose up --build
This builds and starts all services together.

6. 🔍 Access the App
After successful startup:
•	- React Frontend: http://localhost/
•	- Django API: http://localhost/api/
•	- Django Admin: http://localhost/admin/


7. ⚙️ Common Docker Compose Commands
•	Start app: docker-compose up
•	Start + rebuild: docker-compose up --build
•	Stop all: docker-compose down
•	View logs: docker-compose logs
•	Rebuild a service: docker-compose build backend
•	Check running containers: docker ps

8. 🧯 Troubleshooting
•	- Port already in use: Change ports in docker-compose.yml or stop the other app
•	- Docker not running: Start Docker Desktop or run 'sudo systemctl start docker'
•	- React not updating: Rebuild frontend with 'docker-compose up --build frontend'
•	- Backend error: Check logs with 'docker-compose logs backend'


From the project root:

```bash

🛠️ Without Docker (Manual)
1. Backend (Django)

cd notes_backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt

# Run the server
python manage.py runserver


2. Frontend (React + Vite)

cd notes_frontend
npm install
npm run dev




🔐 Task 2: Nginx & SSL Configuration
✅ Nginx reverse proxy setup is completed. It serves both the React frontend and Django backend.

❌ SSL setup is not completed yet.

🛡️ How to Set Up SSL (Planned)
To add HTTPS for your domain using Let's Encrypt and Certbot, follow these steps:

Go to https://certbot.eff.org/
→ Select your server as Nginx and OS as Ubuntu/Linux.

Install required packages:

→ sudo apt update
→ sudo apt install python3 python3-dev python3-venv libaugeas-dev gcc


 Set up Python virtual environment:

→ sudo python3 -m venv /opt/certbot/
→ sudo /opt/certbot/bin/pip install --upgrade pip
→ Install Certbot and Nginx plugin:

→ sudo /opt/certbot/bin/pip install certbot certbot-nginx
→ sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

Run Certbot to enable HTTPS:

→ sudo certbot --nginx

Set up automatic renewal:

→ echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && sudo certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
(Optional) To upgrade Certbot in future:


→  sudo /opt/certbot/bin/pip install --upgrade certbot certbot-nginx

Check and restart Nginx:

→ sudo nginx -t
→ sudo systemctl restart nginx
→ sudo systemctl status nginx




## ✅ Task 7: System Design (Deployment Architecture)

A simple diagram illustrates the architecture of the full-stack app in production:  
🔗 [View Deployment Diagram](https://app.eraser.io/workspace/hCkoaMhtrl7zLkkSCx0U?origin=share)

**Architecture Includes:**
- **React Frontend**: Served by Nginx
- **Django REST Backend**: Serves API endpoints, proxied through Nginx
- **PostgreSQL DB**: Connected to Django via Docker network
- **Docker**: Used to containerize all services
- **Nginx**: Acts as a reverse proxy for API and serves React build
- **SSL (Planned)**: HTTPS termination at Nginx (Let's Encrypt/Certbot)

➡️ All services communicate over Docker internal networks.
