<img src="https://res.cloudinary.com/db0qkzn6a/image/upload/v1768622092/gitdocs/user_38MuOC7m60GfDZ9rIMvS1YG9V5Y/images/ixrdewqpccd3cqv8rkap.png" alt="Sifa Hospita - Hero Banner (Patient & Admin portals)" />

# Sifa-Hospital

A modern hospital management web application (patient portal, doctor panel and admin dashboard) built with React (Vite) for the frontends and Node.js / Express + MongoDB for the backend. Includes appointment booking, doctor management, profile management with Cloudinary image uploads and a JWT-based auth system.

Live demos
- Frontend (Patient portal): https://sifa-hospita-frontend.onrender.com/
- Admin (Dashboard): https://sifa-hospita-admin.onrender.com/doctor-profile/

Table of Contents
- Project overview
- Features
- Tech stack
- Quick start (local)
- Environment variables
- API reference (summary + examples)
- Data model summary
- Deployment notes
- Troubleshooting & tips
- Contributing
- License & contact

---

## Project overview

Repository layout:
- frontend/ — React patient portal (Vite)
- admin/ — Admin dashboard (React)
- backend/ — Node.js + Express API server and MongoDB models

The backend exposes REST endpoints for user (patient) actions, doctor actions, and admin actions. The frontends communicate with the backend API for authentication, booking, and management.

---

## Features

- Patient: register, login, view/update profile (image upload), book appointments, list/cancel appointments
- Doctors: login, view appointments, mark appointment complete/cancel, update profile and availability, dashboard stats
- Admin: add doctor (image upload), list doctors, view/cancel appointments, dashboard stats
- Image uploads using Cloudinary
- JWT-based authentication middleware for user/doctor/admin routes
- Razorpay flow included as comments (optional, requires keys)

---

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Admin: React (separate app)
- Backend: Node.js (ES modules), Express, Mongoose (MongoDB)
- Image storage: Cloudinary
- Dev tools: nodemon (backend)
- Deployment examples used: Render.com

---

## Quick start (local)

Prerequisites:
- Node.js >= 18, npm
- MongoDB (Atlas or local)
- Cloudinary account (for image uploads)
- (Optional) Razorpay account for payments

1) Clone the repository
```bash
git clone https://github.com/ansarirfan/Sifa-Hospita.git
cd Sifa-Hospita
```

2) Backend
```bash
cd backend
npm install
# Development (recommended)
npm run server    # uses nodemon (watch)
# Or production start
npm start
```
Server default port: process.env.PORT || 4000.

3) Frontend (patient)
```bash
cd ../frontend
npm install
npm run dev       # launches Vite dev server (usually http://localhost:5173)
```

4) Admin UI
```bash
cd ../admin
npm install
npm run dev       # check package.json - admin app runs with Vite as well
```

Notes:
- Ensure the frontend(s) are configured to call your backend API (see environment variables below).
- Use Postman / REST client to test backend endpoints before wiring the UI.

---

## Environment variables

Backend (.env at backend/):
- PORT (optional) — e.g. 4000
- MONGODB_URI — MongoDB connection string (required)
- JWT_SECRET — secret used to sign JWT tokens (required)
- ADMIN_EMAIL — admin login email (used by admin login route)
- ADMIN_PASSWORD — admin login password
- CLOUDINARY_CLOUD_NAME — Cloudinary account name
- CLOUDINARY_API_KEY — Cloudinary API key
- CLOUDINARY_API_SECRET — Cloudinary API secret
- RAZORPAY_KEY_ID — (optional) Razorpay key id
- RAZORPAY_KEY_SECRET — (optional) Razorpay secret
- currency — (optional) currency code used in Razorpay example, e.g. "INR"

Frontend (.env at frontend/):
- Vite/React apps typically reference an API base url. Create FRONTEND env keys if needed, e.g.:
  - VITE_API_URL=http://localhost:4000

Admin (.env at admin/):
- Similar to frontend if admin needs API base URL.

Example .env (backend)
```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/sifa?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_strong_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret
```

---

## API Reference (concise)

Base: GET / -> health check

Headers:
- For protected endpoints send the token in headers: token: <JWT_TOKEN>

User (Patient) routes (/api/user)
- POST /api/user/register
  - Body: { name, email, password }
  - Response: { success, token }
  - Example:
    curl -X POST http://localhost:4000/api/user/register -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'

- POST /api/user/login
  - Body: { email, password }
  - Response: { success, token }

- GET /api/user/get-profile
  - Protected: send token in headers
  - Body: { userId } (middleware sets userId from token)
  - Response: { success, userData }

- POST /api/user/update-profile
  - Protected, multipart/form-data (image)
  - Fields: userId, name, phone, address (stringified JSON), dob, gender, image(file)
  - Example using curl (multipart):
    curl -X POST http://localhost:4000/api/user/update-profile \
      -H "token: <TOKEN>" \
      -F "userId=<USER_ID>" \
      -F "name=John Doe" \
      -F "phone=1234567890" \
      -F 'address={"line1":"123 St","line2":"Area"}' \
      -F "dob=1990-01-01" \
      -F "gender=male" \
      -F "image=@/path/to/photo.jpg"

- POST /api/user/book-appointment
  - Protected
  - Body: { userId, docId, slotDate, slotTime }
  - Response: success/failure message

- GET /api/user/appointments
  - Protected
  - Body: { userId }
  - Response: { appointment: [...] }

- POST /api/user/cancel-appointment
  - Protected
  - Body: { userId, appointmentId }

Doctor routes (/api/doctor)
- GET /api/doctor/list
  - Public, returns list of doctors (without email/password)
- POST /api/doctor/login
  - Body: { email, password }
  - Response: { success, token, doctorId, doctorName }

- POST /api/doctor/reset-password
  - Body: { email, newPassword }

- GET /api/doctor/appointments
  - Protected (doctor auth), Body: { docId }
  - Response: { appointments: [...] }

- POST /api/doctor/complete-appointment
  - Protected, Body: { docId, appointmentId }

- POST /api/doctor/cancel-appointment
  - Protected, Body: { docId, appointmentId }

- GET /api/doctor/dashboard
  - Protected, Body: { docId } — returns earnings, appointments count, patients count and latest appointments

- GET /api/doctor/profile
  - Protected, Body: { docId } — doctor profile data (no password)

- POST /api/doctor/update-profile
  - Protected, Body: { docId, fees, address, available }

Admin routes (/api/admin)
- POST /api/admin/login
  - Body: { email, password } — compares against ENV ADMIN_EMAIL & ADMIN_PASSWORD, returns token

- POST /api/admin/add-doctor
  - Protected (admin auth), multipart/form-data (image)
  - Fields: name, email, password, address (stringified JSON), speciality, experience, about, degree, fees, image(file)

- POST /api/admin/all-doctor
  - Protected: returns all doctors

- POST /api/admin/change-availability
  - Protected, Body: { docId } — toggles available

- GET /api/admin/appointments
  - Protected, returns all appointments

- POST /api/admin/cancel-appointment
  - Protected, Body: { appointmentId }

- GET /api/admin/dashboard
  - Protected, returns counts (doctors, patients, appointments) and latestAppointments

Authentication notes:
- userAuth middleware expects token in headers: { token: "<JWT>" }
- Doctor and Admin middleware implemented similarly (see middleware/)

---

## Example flows (curl)

Register -> Login -> Book appointment
1) Register
curl -s -X POST http://localhost:4000/api/user/register -H "Content-Type: application/json" -d '{"name":"Bob","email":"bob@example.com","password":"secret123"}'

2) Login
curl -s -X POST http://localhost:4000/api/user/login -H "Content-Type: application/json" -d '{"email":"bob@example.com","password":"secret123"}'

3) Book appointment (replace tokens and ids)
curl -s -X POST http://localhost:4000/api/user/book-appointment \
  -H "Content-Type: application/json" \
  -H "token: <TOKEN>" \
  -d '{"userId":"<USER_ID>","docId":"<DOC_ID>","slotDate":"2026-01-25","slotTime":"10:30"}'

---

## Data models (summary)

User (users collection)
- name, email (unique), password (hashed), image (URL), address (object), gender, dob, phone

Doctor (doctors collection)
- name, email (unique), password (hashed), image (URL), speciality, degree, experience, about, available (bool), fees, address (object), date, slots_booked (object storing booked times by date)

Appointment (appointments collection)
- userId, docId, slotDate, slotTime, userData (snapshot), docData (snapshot), amount, date, cancelled (bool), payment (bool), isComplete (bool)

Note: Models are maintained with Mongoose schemas in backend/models/.

---

## Deployment notes

- Backend: set env vars on your hosting platform (Render, Heroku, etc.). Ensure MongoDB network access is allowed for the host.
- Cloudinary: required for image uploads. Set cloud name, API key and secret.
- Frontend & Admin: build and deploy (Vite build) then set API base URL to backend production URL.
- Use HTTPS in production for secure token transport.

---

## Troubleshooting & tips

- If image upload fails, validate your Cloudinary keys and that the backend receives multipart/form-data (use upload middleware).
- JWT errors: ensure JWT_SECRET matches between environments and tokens are sent as header key `token`.
- If MongoDB connection fails, verify MONGODB_URI and network access (IP whitelist for Atlas).
- Use `npm run server` in backend for auto-reload during development (requires nodemon).
- If appointment slots seem inconsistent, check doctor.slots_booked object contents in the DB (the backend stores by date keys).

---

## Contributing

Contributions welcome — please open issues or PRs. Basic guidelines:
- Fork repository, create a feature branch, open a PR with a clear description.
- Keep changes small and focused; add tests where appropriate.
- Add environment changes to README and example .env files (do not commit real secrets).

---

## License & authors

- Backend package.json uses "ISC" license; repository has no top-level LICENSE file. Add or update LICENSE as required.
- Repo: ansarirfan/Sifa-Hospita

---

## Contact / Support

If you need help running the project or integrating with your systems, open an issue in the repo with details (error logs, steps to reproduce) and I'll help.

Thank you — happy hacking! 🚑
