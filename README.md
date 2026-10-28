# Patientor v2 🏥

## 🌐 Live Demo

[https://patientorv2.netlify.app/]

## 🎥 Demo Video

//[TODO]

A full-stack patient and employee management web application built with React, TypeScript, Node.js, Express, and MongoDB.

Originally developed as part of the [Full Stack Open](https://fullstackopen.com/en/) Part 9 TypeScript curriculum, Patientor v2 was extended into a personal project to simulate a real-world working environment. The goal was to go beyond completing course requirements and explore how a full-stack application could be developed with additional business requirements, authentication, role-based access control, data validation, and automated testing.

## ✨ Features

### CRUD Operations & Access Control

- Implemented Create, Read, Update, and Delete (CRUD) operations for patient records and employee accounts.
- Supported multiple medical entry types using TypeScript discriminated unions.
- Implemented authentication and three user roles: `Master`, `Admin`, and `Normal`.
- Enforced role-based access control (RBAC) in the Express backend to restrict operations according to each role's permissions.
- Supported password changes according to role permissions.
- Returned appropriate HTTP status codes, including `401 Unauthorized` and `403 Forbidden`, for authentication and authorisation failures.
- Used Zod to validate incoming data and help maintain data consistency.

### Frontend Architecture

- Built the user interface with React, TypeScript, and Material UI (MUI).
- Used Zustand to manage application state and asynchronous API operations.
- Created reusable modal components for different medical entry types.
- Used a custom `ThemeProvider` for consistent application styling.

## 🛠️ Tech Stack

| Area             | Technologies                         |
| ---------------- | ------------------------------------ |
| Frontend         | React, TypeScript, Material UI (MUI) |
| State Management | Zustand                              |
| Backend          | Node.js, Express                     |
| Database         | MongoDB                              |
| Validation       | Zod                                  |
| Testing          | Playwright                           |
| CI/CD            | GitHub Actions                       |

## 🧪 Testing & Quality Assurance

- **API tests:** 55 automated tests covering successful requests, authentication failures (`401`), forbidden operations (`403`), missing resources (`404`), and invalid input data.
- **Frontend tests:** 21 Playwright tests covering successful user interactions and unauthorised responses (`401`).
- **Continuous Integration:** GitHub Actions workflow to automatically run the test suites when code is pushed or a pull request is opened.

## 🧠 Technical Challenges & Learning

- **TypeScript:** Used discriminated unions and type guards to model different medical entry types.
- **Data validation:** Applied Zod schemas to validate API payloads and improve consistency between the client and server.
- **State management:** Used Zustand to organise application state and asynchronous API operations.
- **Access control:** Designed and implemented three user roles with different permissions enforced by the backend.
- **Reusable components:** Built modal interfaces to handle different medical entry types without unnecessary code duplication.
- **Automated testing:** Used Playwright to test API behaviour, frontend interactions, and error-handling scenarios.
- **Real-world development practice:** Extended a course assignment with additional requirements to practise application design, authentication, authorisation, and testing beyond the original coursework.

## 🚀 Future Possible Improvements

- **Search and filtering:** Add search and filtering tools for patient records and employee accounts to make information easier to find.
- **AI integration for patient records:** Explore AI-assisted summaries of patient history, such as long-term conditions, medication allergies, previous appointments, and relevant changes between records. This would require appropriate privacy safeguards and careful validation of AI-generated information.
