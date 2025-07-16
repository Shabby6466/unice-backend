<h1>Unice Backend
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

# UNICE Backend – NestJS API Skeleton

UNICE is a scalable backend API architecture built with [NestJS](https://nestjs.com) for a communication platform supporting modules like audio/video calling, real-time chat, user profiles, wallet services, referrals, and more.

> ⚠️ This is a **code skeleton** version. All sensitive logic, UI integration, and API endpoints have been stripped for confidentiality.  
> This repository is intended for **portfolio**, **technical demonstration**, or **internal onboarding** use only.

---

## 🚀 Highlights

- Modular NestJS architecture following Domain-Driven Design
- PostgreSQL + TypeORM integration with support for migration and seeding
- Redis support for caching and Pub/Sub-based communication
- JWT-based authentication structure (without actual implementation)
- Centralized response formatter and custom exception filters
- Configurable `.env` setup for dev and production environments
- Docker and Docker Compose support for local and CI deployment
- Utilities for logging, mailer, file uploads (S3-ready), and pagination
- Type-safe DTOs, guards, and interceptors (stubs included)
- Scalable folder structure for future microservices

---

## 📁 Folder Structure

```txt
src/
├── common/                 # Shared utilities, DTOs, filters, JWT, validators
│   ├── dto/
│   ├── entities/
│   ├── filters/
│   ├── jwt/
│   ├── transformer/
│   └── validator/
├── database/               # TypeORM configuration, migrations, and seeds
├── modules/                # Feature-based modules (currently skeletons)
│   ├── auth/
│   ├── calling/
│   ├── chat/
│   ├── wallet/
│   ├── media/
│   ├── friendship/
│   ├── referrals/
│   └── static-assets/
├── response/               # Standardized API response handler
├── utils/                  # Logger, Mailer, S3, Pagination helpers
│   ├── logger/
│   ├── mailer/
│   ├── pagination/
│   └── s3/
├── main.ts                 # Application entrypoint

---

## 📦 Tech Stack

- **Node.js (18.x via NVM)**
- **NestJS** – Modular backend framework
- **PostgreSQL** – Relational database
- **Redis** – In-memory caching & pub/sub
- **ORM** – TYPEORM
- **Auth** – Jwt(STUBBED)
- **Docker + Docker Compose** – Containerized development
- **TypeORM** – ORM for PostgreSQL
- **Yarn** – Package management

---
## ❌ What’s Removed (For Confidentiality)
	- •	Actual DTOs, controllers, and services
	- •	Business logic and API implementations
	- •	Authentication and authorization flows
	- •	Client credentials, secrets, and environment configs
	- •	Private S3 buckets or file upload integrations

---

## Used as:
	- •	A starter kit for large-scale backend development
	- •	A demonstration of production-ready NestJS code structure
	- •	A boilerplate for communication apps (chat, calling, wallet, etc.)
  
---
## 🙋‍♂️ Support or Questions

***If you have any questions about the structure or how to use this skeleton for your own project, feel free to open an issue or reach out***.

- Thanks for checking out **UNICE Backend** – happy coding! 🚀