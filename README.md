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

## 🐳 Run with Docker

From the project root:

```bash
docker-compose up --build




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
