# 🎯 Multi-Brand Social Media Content Admin

A premium, SaaS-style Admin Panel for agencies and content teams to manage multiple social media brands from a single, unified dashboard. Built with a focus on high-performance UI/UX, dynamic theming, and shared state management.

---

## 🚀 Key Features

### 🔐 Authentication System
- **Premium Login Page:** Glassmorphism design with animated backgrounds.
- **Session Management:** Secure session persistence using `sessionStorage`.
- **Protected Routes:** Automatic redirection to login for unauthorized users.
- **Static Access:** `admin@example.com` / `password123`.

### 📊 Multi-Brand Dashboard
- **Dynamic Theming:** UI colors instantly adapt to the active brand's identity.
- **Reactive Stats:** Real-time KPI cards for followers, engagement, and reach.
- **Interactive Charts:** Beautiful Recharts for growth tracking and engagement rate.

### 📋 Content Workflow (Kanban)
- **Drag-and-Drop:** Intuitive pipeline management from "Draft" and "In Review" to "Published".
- **Live Sync:** Real-time updates across the dashboard when post status changes.
- **Media Previews:** Visual cards showing platform, metrics, and content.

### 📅 Smart Content Calendar
- **Shared Visualization:** Centralized view of all scheduled posts across brands.
- **Navigation:** Easily toggle between monthly and weekly views.
- **Status Badges:** Color-coded badges for quick identification of post states.

### ✍️ Advanced Post Creation
- **AI-Powered:** Mock AI caption generator for instant creative suggestions.
- **Image Upload:** Fully functional image upload with drag-and-drop support.
- **Real-time Preview:** Accurate mobile-style preview (Instagram layout).

---

### 🛠 Tech Stack

- **Core:** React 18, Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router Dom v7
- **State:** React Context API (Auth, Brand, and Post stores)

---

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── layout/          # Sidebar, Header, Page Wrappers
│   ├── dashboard/       # StatCards, PostFlow, Activity
│   └── collaboration/   # Comments System, Team tools
├── pages/               # Top-level page components
│   ├── Dashboard/       # Overview Analytics
│   ├── Calendar/        # Content Scheduling
│   ├── Kanban/          # Workflow Management
│   ├── Analytics/       # Detailed Performance Reports
│   ├── Team/            # User & Role Management
│   ├── Auth/            # Login & Security
│   └── Settings/        # (Coming Soon) Profile & Config
├── store/               # React Context stores (State Management)
│   ├── AuthContext.jsx  # Session & User State
│   ├── BrandContext.jsx # Theming & Active Brand
│   └── PostContext.jsx  # Centralized Post Repository
├── layouts/             # Main application layout wrappers (MainLayout.jsx)
├── App.jsx              # Main Router & Provider configuration
├── main.jsx             # Application Entry Point
└── index.css            # Tailwind v4 configuration & global styles
```

---

## 💻 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Installation
```bash
# Clone the repository
# git clone <repo-url>

# Install dependencies
npm install
```

### 3. Development Mode
```bash
# Run the local dev server
npm run dev
```
The app will be available at `http://localhost:5173`.

### 4. Build for Production
```bash
# Create a production-ready bundle
npm run build
```

---

## 👤 Default Credentials

To explore the admin area, use the following static credentials:
- **Email:** `admin@example.com`
- **Password:** `password123`

---

*Developed with ❤️ for Advanced Social Media Management.*
