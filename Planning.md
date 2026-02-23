# Development Planning Document

## 1. Project Structure

```
├── app/
│   ├── patient/            # Patient Form page
│   │   ├── page.tsx        # Main form UI, validation, socket emit
│   │   └── TopNav.tsx      # Shared navigation bar component
│   ├── staff/              # Staff Dashboard page
│   │   └── page.tsx        # Real-time display, status indicator
│   ├── thankyou/           # Thank You page
│   │   └── page.tsx        # แสดงหลัง submit สำเร็จ
│   ├── lib/
│   │   └── socket.ts       # Socket.io client instance (shared)
│   └── server/
│       └── server.js       # Express + Socket.io server
├── public/
│   ├── bg_main.png         # Background image
│   └── agnosimg.png        # Agnos logo
└── README.md
```

### Separation of Concerns

- `patient/` และ `staff/` แยกกันชัดเจน ไม่มี shared state ระหว่างกัน ทุกอย่างสื่อสารผ่าน Socket.io
- `lib/socket.ts` เป็น singleton instance ใช้ร่วมกันทั้งโปรเจกต์ ไม่ต้องสร้าง connection ใหม่ทุกครั้ง
- Backend แยกออกจาก Next.js อยู่ใน `server/` เพื่อให้ deploy แยกได้อิสระ

---

## 2. Design Decisions

### Layout
- ใช้ **2-column grid** (`md:grid-cols-2`) สำหรับทั้ง Patient Form และ Staff Dashboard เพื่อใช้พื้นที่หน้าจอได้มีประสิทธิภาพบน desktop
- บน mobile จะ collapse เป็น 1 column อัตโนมัติผ่าน Tailwind responsive prefix

### Visual Style
- ใช้ background image พร้อม `blur` + `opacity` เพื่อให้ดู clean โดยไม่รบกวนการอ่าน
- Card สีขาว (`bg-white rounded-xl shadow`) วางทับ background เพื่อแยก content ออกจาก background ชัดเจน
- สี Primary ใช้โทนน้ำเงิน (`#1E4FA8`, `#2F6FD6`) ให้ดู professional เหมาะกับ medical system

### Form UX
- Required fields แสดง `*` และ error message สีแดงใต้ field ทันที
- Progress bar แสดง % ของ field ที่กรอกแล้ว เพื่อให้ผู้ป่วยรู้ว่าเหลืออีกเท่าไหร่
- Submit button มี loading state (spinner) และ success state เพื่อ feedback ที่ชัดเจน
- หลัง submit สำเร็จ redirect ไปหน้า Thank You เพื่อยืนยันการส่งข้อมูล

### UI
- Background image ที่เหมือนกับเว็บไซต์ Agnos พร้อม blur + opacity overlay ให้ดู clean ไม่รบกวนการอ่าน
- Card สีขาว (`bg-white rounded-xl shadow`) วางทับ background แยก content ออกชัดเจน
- สี Primary โทนน้ำเงิน (`#1E4FA8`, `#2F6FD6`) ให้ดู professional เหมาะกับ medical system และ theme ของ Agnos
- Status indicator ใช้ dot สี + ข้อความ (เทา / น้ำเงิน pulse / เขียว) แสดงสถานะผู้ป่วยแบบ real-time
- Responsive ทุกหน้า รองรับทั้ง mobile และ desktop

---

## 3. Component Architecture

### `app/patient/page.tsx` — Patient Form
รับผิดชอบ
- Render ฟอร์มทั้งหมดพร้อม validation
- `handleChange` — emit ข้อมูลและ status `"Typing..."` ไปยัง server ทุกครั้งที่มีการเปลี่ยนแปลง
- `handleSubmit` — validate แล้ว emit status `"Submitted"` จากนั้น redirect ไปหน้า `/thankyou`
- คำนวณ progress จาก required fields ที่กรอกแล้ว

### `app/staff/page.tsx` — Staff Dashboard
รับผิดชอบ
- Listen event `patient-data` และ `status` จาก server
- แสดงข้อมูลใน card grid แบบ real-time
- แสดง status indicator (Waiting / Typing... / Submitted) พร้อม dot สี
- แสดง last updated timestamp

### `app/thankyou/page.tsx` — Thank You Page
รับผิดชอบ
- แสดงหน้ายืนยันหลังจาก patient submit ฟอร์มสำเร็จ
- แจ้งให้ผู้ป่วยทราบว่าข้อมูลถูกส่งเรียบร้อยแล้ว

### `app/patient/TopNav.tsx` — Navigation Bar
- Shared component ใช้ทั้ง Patient และ Staff page
- แสดง logo (agnosimg.png) และ link สลับระหว่าง 2 หน้า

### `app/lib/socket.ts` — Socket Client
- สร้าง Socket.io client instance เพียงครั้งเดียว
- Export ออกไปใช้ใน page ที่ต้องการ

### `app/server/server.js` — Backend Server
- Express + Socket.io server
- รับ event จาก patient แล้ว broadcast ไปยัง staff ทุก client ที่ connect อยู่

---

## 4. Real-Time Synchronization Flow

```
Patient (Browser)                Server                  Staff (Browser)
      |                             |                           |
      |  onChange (any field)       |                           |
      |─── emit("patient-data") ───►|                           |
      |─── emit("status","Typing")->|                           |
      |                             |── broadcast("patient-data")──►|
      |                             |── broadcast("status") ───────►|
      |                             |                           |
      |  onClick Submit             |                           |
      |─── emit("status","Submitted")►|                         |
      |                             |── broadcast("status") ───────►|
      |                             |                           |
      |  redirect → /thankyou       |                           |
```

### Flow อธิบาย
1. ผู้ป่วยพิมพ์ใน field ใดก็ตาม → `handleChange` จะ emit event `patient-data` พร้อมข้อมูลทั้งหมด และ emit `status` เป็น `"Typing..."`
2. Server รับ event แล้ว broadcast ไปยังทุก client ที่ connect อยู่ทันที
3. Staff Dashboard รับ event → update state → React re-render แสดงผลใหม่
4. เมื่อผู้ป่วย Submit → emit `status` เป็น `"Submitted"` → Staff เห็น status เปลี่ยนเป็นสีเขียว
5. Patient ถูก redirect ไปหน้า `/thankyou` อัตโนมัติ
6. หากไม่มีการกรอก → Staff เห็น status เป็น `"Waiting"` สีเทา

### Technology
- **Socket.io** — จัดการ WebSocket connection พร้อม fallback และ auto-reconnect
- **Frontend** deploy บน **Vercel**
- **Backend** deploy บน **Render** แยกจาก frontend เนื่องจาก Vercel ไม่รองรับ persistent WebSocket server