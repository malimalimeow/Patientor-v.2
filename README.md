# Patientor 🏥

> An advanced, customized full-stack patient and employee management web application.
> Originally inspired by the **Full Stack Open (Part 9: TypeScript)** curriculum, this project has been heavily extended and refactored with a custom architecture, extended entry models, and comprehensive test coverage.

Patientor is designed to streamline medical record management with role-based access control, strict type-safety, and a clean, modern UI for handling patient details and diverse medical entries.

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Material UI (MUI), Zustand
- **Backend:** Node.js, Express, MongoDB
- **Validation & Types:** Zod

---

## ✨ Key Features & Architectural Overhauls

- **Custom Domain & Entry Modeling:** Redefined and extended the core data domain, including customized **discriminated unions** for `Entry` types and enhanced role-based employee access control beyond the original course scope.
- **Strict Data Validation & Type Safety:** Implemented end-to-end type safety across the stack using **Zod schemas** to strictly validate API payloads and catch runtime mismatch early.
- **State & API Architecture:** Re-engineered state management using **Zustand** to seamlessly handle complex asynchronous API workflows and eliminate frontend state desynchronization.
- **Modular Component Design:** Built reusable modal architectures to handle multiple entry types dynamically without code duplication.
- **Modern UI Transformation:** Refactored the UI with **Material UI (MUI)** and a custom global `ThemeProvider` to provide a clean, modern, and accessible dashboard layout.

---

## 🧪 Testing & Quality Assurance

- **API Integration Suite:** Engineered a robust backend test suite with **55 passing integration tests**, ensuring payload consistency and preventing schema mismatch between the client and server.
- **Automated E2E Testing:** Integrated **Playwright** to validate end-to-end user journeys and UI components.

---

## 💡 What I Learned

- Deepened expertise in **TypeScript advanced types** (such as discriminated unions and type guards) to catch runtime errors at compile time.
- Gained hands-on experience in structuring scalable **Zustand** stores for complex full-stack applications.
- Mastered enterprise-level component styling and layout structuring using **MUI**.
