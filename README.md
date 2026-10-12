# Patientor 🏥

> A full-stack patient and employee management web application developed as part of the **Full Stack Open (Part 9: TypeScript)** curriculum.

Patientor is designed to streamline medical record management with role-based access control, strict type-safety, and a clean, modern UI for handling patient details and diverse medical entries.

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Material UI (MUI), Zustand
- **Backend:** Node.js, Express, MongoDB
- **Validation & Types:** Zod

---

## ✨ Key Features

- **End-to-End Type Safety:** Leveraged TypeScript and **Zod schema validation** to ensure robust data integrity across both frontend forms and backend APIs.
- **Advanced State & API Management:** Utilized **Zustand** for centralized global state management and streamlined asynchronous API workflows.
- **Dynamic Modular Architecture:** Built reusable modal components to handle multi-type operations efficiently, minimizing code redundancy.
- **Modern Minimalist UI:** Designed with **Material UI (MUI)** featuring custom theme overrides (`ThemeProvider`) for a professional, clean, and accessible healthcare dashboard interface.
- **Complex Domain Modeling:** Implemented discriminated unions in TypeScript to accurately manage varied entry types (HealthCheck, Hospital, Occupational Healthcare).

---

## 🧪 Testing & Quality Assurance

- **API Integration Testing:** Validated core backend logic and payload handling with **55 comprehensive tests** (100% passing).
- **End-to-End (E2E) Testing:** Configured **Playwright** to automate user flow validations and frontend interactions.

---

## 💡 What I Learned

- Deepened expertise in **TypeScript advanced types** (such as discriminated unions and type guards) to catch runtime errors at compile time.
- Gained hands-on experience in structuring scalable **Zustand** stores for complex full-stack applications.
- Mastered enterprise-level component styling and layout structuring using **MUI**.
