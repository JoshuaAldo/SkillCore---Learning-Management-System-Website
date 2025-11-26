🧑‍🏫 SkillCore - Learning Management System (LMS)

SkillCore is a Learning Management System platform based on MERN Stack (MongoDB, Express.js, React.js, Node.js) that provides digital learning features such as:
1. User Management (Student & Manager/Admin)
2. Enroll course
3. Content management
4. Edit profile + profile photo
5. Secure authentication (JWT)
6. Real deployment with Nginx + PM2

🌐 Live Demo: https://skillcore.my.id

🚀 Tech Stack
| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React + Vite + Tailwind        |
| Backend    | Node.js + Express.js + JWT     |
| Database   | MongoDB Atlas or Local MongoDB |
| Deployment | Ubuntu Server + PM2 + Nginx    |
| Storage    | Local server storage           |
| Editor     | TinyMCE                        |

🔑 Demo Account (Public Access)
| Role    | Email              | Password     |
| ------- | ------------------ | ------------ |
| Student | student1@gmail.com | Password1234 |
| Manager | admin@gmail.com    | Password1234 |

📦 Install & Run Locally
1️⃣ Clone Project
* `git clone https://github.com/JoshuaAldo/SkillCore---Learning-Management-System-Website.git`
* `cd SkillCore---Learning-Management-System-Website`

2️⃣ Setup Backend
* `cd be-lms`
* `npm install`
* Create .env file:
```
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/lmsDB"

# Payment Gateway (Midtrans)
MIDTRANS_URL="https://app.sandbox.midtrans.com/snap/v1/transactions"
MIDTRANS_AUTH_STRING="<your_midtrans_key>"

# Application URLs
APP_FE_URL="http://localhost:5173"
APP_URL="http://localhost:3000"

# Security Keys
SECRET_KEY_JWT="yourSecretKey"
VITE_SECURE_LOCAL_STORAGE_HASH_KEY="localHashKey"

# Mailer Configuration
SMTP_USER="example@gmail.com"
SMTP_PASS="yourGeneratedAppPassword"
```
* Run backend:
`npm run dev`
* Backend run on: `📍 http://localhost:3000`

3️⃣ Setup Frontend
* `cd ../fe-lms`
* `npm install`
* Create .env file:
```
VITE_API_URL = http://localhost:3000/api
VITE_SECURE_LOCAL_STORAGE_HASH_KEY=localHashKey
```
* Run frontend: `npm run dev`
* Frontend run on: `📍 http://localhost:5173`

📝 Features
* 🔒 JWT Authentication (Login, Register)
* 👤 Profile Management (update username/email/password/photo)
* 🎓 Course Listing & Enrollment
* 📚 Learning Content Viewer
* 📬 Reset Password via Email (SMTP)
* ⚙ Role-based Access

📌 Folder Structure
```/
├── fe-lms   → Frontend (React + Vite)
└── be-lms   → Backend (Express API)
```

🤝 Contributing
* Pull requests are welcome! Please open a discussion about the new feature.

📄 License
* Free for personal & educational use.
