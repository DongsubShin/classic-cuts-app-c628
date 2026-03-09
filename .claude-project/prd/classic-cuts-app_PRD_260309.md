# Classic Cuts App — Product Requirements Document

**Version:** 1.0
**Date:** 2023-10-27
**Status:** Draft

---

## 0. Project Overview

### Product

**Name:** Classic Cuts App
**Type:** Web Application (Mobile-responsive PWA)
**Deadline:** Q1 2024
**Status:** Draft

### Description

Classic Cuts App is a custom-built shop management and client booking platform designed specifically for the Classic Cuts barbershop in Memphis, TN. The application replaces the existing Square Appointments system, providing a tailored experience for 5 barbers to manage their schedules, track client relationships (CRM), automate SMS reminders, and calculate complex commission structures in real-time.

### Goals

1. **Streamline Operations:** Transition from Square Appointments to a proprietary system that reduces monthly SaaS overhead and fits the specific workflow of a 5-barber shop.
2. **Enhance Client Retention:** Implement a robust CRM to track client preferences, formula notes, and visit history.
3. **Automate Financials:** Eliminate manual spreadsheet calculations for barber commissions by automating tracking based on completed services.

### Target Audience

| Audience | Description |
|----------|-------------|
| **Primary** | **Local Clients:** Residents of Memphis looking for a seamless way to book and manage hair appointments. |
| **Secondary** | **Barbers & Shop Owner:** The 5-man team at Classic Cuts who need to manage their daily bread and butter. |

### User Types

| Type | DB Value | Description | Key Actions |
|------|----------|-------------|-------------|
| **Client** | `0` | General public booking services | Book, reschedule, view history, manage profile |
| **Barber** | `1` | Service providers (5 total) | Manage personal schedule, view own commissions, client notes |
| **Admin** | `99` | Shop Owner / Manager | Full system access, commission overrides, shop-wide reporting |

### User Status

| Status | DB Value | Behavior |
|--------|----------|----------|
| **Active** | `0` | Full access to booking or management features |
| **Suspended** | `1` | Cannot log in — show: "Account suspended. Please contact the shop owner." |
| **Withdrawn** | `2` | Data retained for 90 days for tax/record purposes then anonymized |

### MVP Scope

**Included:**
- Real-time booking engine with barber-specific availability
- SMS automated reminders (24h and 1h before)
- Client CRM with visit history and "Barber Notes"
- Commission tracking module (Percentage-based)
- Admin dashboard for shop-wide performance metrics

**Excluded (deferred):**
- In-app point of sale (POS) hardware integration (will use manual "Mark as Paid")
- Multi-location support
- Inventory/Product sales tracking

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|------|------------|
| **Classic Cuts App** | The unified platform for booking and shop management. |
| **Appointment** | A reserved time slot for a specific service with a specific barber. |
| **Service** | A menu item (e.g., Fade, Beard Trim, Hot Towel Shave) with a set price and duration. |
| **Commission** | The percentage of the service price allocated to the barber. |

### User Roles

| Role | Description |
|------|-------------|
| **Guest** | Unauthenticated user browsing the service menu and barber profiles. |
| **Client** | Authenticated user with a verified phone number for booking. |
| **Barber** | Staff member with access to their own calendar and client list. |
| **Admin** | Owner with access to financial data and shop settings. |

### Status Values

| Enum | Values | Description |
|------|--------|-------------|
| **AppointmentStatus** | `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW` | Tracks the lifecycle of a booking. |
| **PaymentStatus** | `UNPAID`, `PAID`, `REFUNDED` | Tracks the financial state of a completed service. |

### Technical Terms

| Term | Definition |
|------|------------|
| **PWA** | Progressive Web App — allows the site to be "installed" on client phones. |
| **TypeORM** | The Object Relational Mapper used to interact with the PostgreSQL database. |
| **NestJS** | The Node.js framework used for the backend API. |

---

## 2. System Modules

### Module 1 — Booking Engine

Handles the complex logic of matching service duration, barber availability, and existing appointments.

#### Main Features

1. **Dynamic Slot Calculation** — Checks barber schedules and blocks out time based on service duration (e.g., 30m vs 60m).
2. **Barber Selection** — Allows clients to choose a specific barber or "First Available."
3. **Conflict Prevention** — Double-booking protection at the database level using transaction isolation.

#### Technical Flow

##### The Booking Flow

1. User selects "Fade" (45 mins) and "Barber: Marcus."
2. Frontend requests available slots for Marcus on [Date].
3. Backend queries `appointments` table for Marcus where status is not `CANCELLED`.
4. Backend calculates gaps in the `working_hours` that are ≥ 45 mins.
5. User selects 10:00 AM and clicks "Confirm."
6. Backend creates `Appointment` record with `PENDING` status and triggers SMS verification.

---

### Module 2 — Client CRM

A centralized database of all clients to personalize the barbering experience.

#### Main Features

1. **Client Profiles** — Stores contact info, total visits, and "Last Barber."
2. **Service Notes** — Barbers can leave private notes (e.g., "Uses #2 guard on sides, sensitive skin").
3. **Visit History** — Chronological list of all past services and photos.

#### Technical Flow

1. Barber finishes a cut and opens the Appointment Detail.
2. Barber enters text into the "Technical Notes" field.
3. App sends a `PATCH` request to `/api/clients/:id/notes`.
4. Backend updates the client record and timestamps the note.
5. On the next booking, the assigned barber sees these notes on their "Today's Schedule" view.

---

### Module 3 — Commission & Reporting

Automates the calculation of earnings for the 5 barbers based on their individual split agreements.

#### Main Features

1. **Commission Profiles** — Set different % rates per barber (e.g., Senior Barber 70%, Junior 60%).
2. **Daily/Weekly Summaries** — Automated reports showing gross revenue vs. barber payout.
3. **Payout Logs** — Tracks when a barber has been paid by the owner.

#### Technical Flow

1. Admin marks an appointment as `COMPLETED` and `PAID`.
2. System triggers `CommissionService.calculate(appointmentId)`.
3. System fetches the `CommissionRate` for the assigned Barber.
4. System creates a `CommissionEntry` (e.g., $30 service * 0.70 = $21 entry).
5. The Barber's "Unpaid Balance" dashboard updates in real-time.

---

## 3. User Application

### 3.1 Page Architecture

**Stack:** React, React Router, Tailwind CSS, React Query

#### Route Groups

| Group | Access |
|-------|--------|
| Public | Anyone (Landing, Service Menu) |
| Auth | Unauthenticated (Login/Signup via Phone) |
| Protected | Logged-in Clients |

#### Page Map

**Public**
| Route | Page |
|-------|------|
| `/` | Home / Landing Page |
| `/services` | Service Menu & Pricing |
| `/barbers` | Barber Profiles & Portfolios |

**Auth**
| Route | Page |
|-------|------|
| `/login` | Phone Number Entry |
| `/verify` | OTP (One-Time Password) Verification |

**Protected**
| Route | Page |
|-------|------|
| `/book` | Booking Wizard (Step-by-step) |
| `/appointments` | My Upcoming & Past Appointments |
| `/profile` | Personal Info & Notification Settings |

---

### 3.2 Feature List by Page

#### `/` — Home

- **Hero Section:** Shop branding, address in Memphis, and "Book Now" CTA.
- **Quick Info:** Today's hours and current wait times (if applicable).
- **Social Proof:** Gallery of recent cuts pulled from Instagram.

#### `/book` — Booking Wizard

- **Step 1: Service Selection:** Category-based list (Haircuts, Shaves, Combos).
- **Step 2: Barber Selection:** Cards showing barber name, specialty, and next available time.
- **Step 3: Date/Time:** Calendar view with available time slots.
- **Step 4: Confirmation:** Summary of booking with "Add to Calendar" option.

#### `/appointments` — My Appointments

- **Active Bookings:** Card view with "Reschedule" or "Cancel" buttons (enforces 24h policy).
- **History:** List of past services, barbers seen, and prices paid.
- **Rebook Button:** One-click booking for the same service/barber as last time.

---

## 4. Admin Dashboard

### 4.1 Page Architecture

**Access:** Barber or Admin role only

| Route | Page |
|-------|------|
| `/admin` | Shop Overview (Stats) |
| `/admin/schedule` | Master Calendar (All Barbers) |
| `/admin/clients` | CRM / Client List |
| `/admin/commissions` | Financial Reports |
| `/admin/settings` | Shop Hours & Service Management |

---

### 4.2 Feature List by Page

#### `/admin` — Shop Overview

- **Daily Stats:** Total appointments today, expected revenue, no-show rate.
- **Barber Status:** Who is currently clocked in or with a client.
- **Alerts:** Low-stock alerts (if added later) or pending cancellation requests.

#### `/admin/schedule` — Master Calendar

- **Multi-Column View:** One column per barber showing their daily timeline.
- **Drag-and-Drop:** Ability to move appointments between barbers or times.
- **Manual Entry:** "Walk-in" button to quickly add a client to the schedule.

#### `/admin/clients` — Client Management

- **Search Bar:** Search by name or phone number.
- **Client Detail View:** Full history, contact info, and "Flag" system (for problematic clients).
- **Export:** Download client list as CSV for marketing.

#### `/admin/commissions` — Financials

- **Barber Ledger:** Table showing each barber, their total sales, and their calculated cut.
- **Date Filter:** View by week, month, or custom range.
- **Mark as Paid:** Button to clear a barber's pending balance once they are paid out.

---

## 5. Tech Stack

### Architecture

The system follows a classic decoupled architecture with a RESTful API and a responsive web frontend.

```
classic-cuts-app/
├── backend/    ← NestJS API
├── frontend/   ← React (Vite) Client App
└── shared/     ← TypeScript interfaces and Enums
```

### Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Backend | NestJS | 10.x | API server & Business Logic |
| Language | TypeScript | 5.x | Type safety across stack |
| ORM | TypeORM | 0.3.x | Database access & Migrations |
| Database | PostgreSQL | 15 | Primary relational data store |
| Frontend | React | 18.x | UI Library |
| Routing | React Router | 6.x | Client-side navigation |
| State | TanStack Query | 5.x | Server state management |
| CSS | Tailwind CSS | 3.x | Utility-first styling |
| Build | Vite | 4.x | Frontend tooling |

### Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Twilio** | SMS Gateway for appointment reminders and OTP login. |
| **AWS S3** | Storage for barber portfolio photos and client "before/after" shots. |
| **Google Calendar API** | Syncing shop schedule to barbers' personal phones. |

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| **Phone-only Auth** | Barbershop clients prefer quick SMS login over remembering passwords. |
| **PostgreSQL** | Relational structure is critical for complex scheduling and financial reporting. |
| **PWA over Native** | Lower development cost and no App Store friction for a local business. |

---

## 6. Open Questions

| # | Question | Context / Impact | Owner | Status |
|:-:|----------|-----------------|-------|--------|
| 1 | **Cancellation Policy?** | Do we charge a fee for late cancellations? Requires payment gateway integration. | Client | ⏳ Open |
| 2 | **Square Data Migration?** | Do we need to import the existing client list from Square? | Dev Team | ⏳ Open |
| 3 | **Walk-in Handling?** | How should the system handle walk-ins that don't want to provide a phone number? | Client | ⏳ Open |
| 4 | **Commission Tiers?** | Do commission percentages change based on performance (e.g., >$1k/week)? | Client | ⏳ Open |