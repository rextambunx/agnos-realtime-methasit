# Agnos Realtime Patient Form


> โปรเจกต์นี้จัดทำขึ้นเพื่อส่งเป็นแบบทดสอบสำหรับนายเมธาสิทธ์ ตามบุญ ตำแหน่ง Front-end Developer ของบริษัท Agnos เท่านั้น

## Overview

ระบบฟอร์มกรอกข้อมูลผู้ป่วยแบบ Real-time ประกอบด้วย 2 หน้าหลัก

- **Patient Form** — หน้าสำหรับผู้ป่วยกรอกข้อมูลส่วนตัว พร้อม form validation และ progress bar
- **Staff Dashboard** — หน้าสำหรับเจ้าหน้าที่ดูข้อมูลที่ผู้ป่วยกำลังกรอกแบบ Real-time พร้อมแสดงสถานะ Waiting / Typing... / Submitted

## Live Demo

| Service  | URL |
|----------|-----|
| Frontend | https://agnos-realtime-methasit.vercel.app/ |
| Backend  | https://agnos-realtime-methasit.onrender.com/ |

## Tech Stack

- **Framework**: Next.js + TypeScript
- **Styling**: TailwindCSS
- **Real-Time**: Socket.io (WebSocket)
- **Hosting**: Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

---

### Frontend

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

เปิดที่ http://localhost:3000

---

### Backend

```bash
# 1. เข้าไปที่ folder server
cd app/server

# 2. Install dependencies
npm install

# 3. Run server
node server.js
```

Server จะรันที่ http://localhost:4000

---

## Project Structure

```
├── app/
│   ├── patient/        # Patient Form page
│   ├── staff/          # Staff Dashboard page
│   ├── lib/
│   │   └── socket.ts   # Socket.io client config
│   └── server/
│       └── server.js   # Express + Socket.io server
├── public/
│   └── bg_main.png
└── README.md
```