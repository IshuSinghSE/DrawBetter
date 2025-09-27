<div align="center">
  <img src="public/logo-white.svg" alt="DrawBetter Logo" width="400" height="auto">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Convex-1.27.3-blue?style=for-the-badge&logo=data%3Aimage/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjIwQzE0IDIxLjEgMTMuMSAyMiAxMiAyMkg0QzIuOSAyMiAyIDIxLjEgMiAyMFYyQzIgMi45IDIuOSAyIDQgMkgxMkMxMy4xIDIgMTQgMi45IDE0IDRWMTJIMTJDMTAuOSAxMiAxMCAxMC45IDEwIDlWNFoiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+" alt="Convex">
  <img src="https://img.shields.io/badge/Liveblocks-3.7.1-red?style=for-the-badge" alt="Liveblocks">
  <img src="https://img.shields.io/badge/Clerk-6.32.2-orange?style=for-the-badge" alt="Clerk">
  <br>
  <img src="https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge" alt="Version">
  <br>
  <a href="https://draw-better.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Deployed-green?style=for-the-badge&logo=vercel" alt="Live Demo"></a>

</div>

<div align="center">
  <p><em>Collaborative Drawing Platform</em></p>
  <p><strong>Real-time collaborative drawing for teams</strong></p>
</div>

---

<div align="center">
  <p><em>Built for creatives and collaborators</em></p>
</div>

---

## 📖 Overview

DrawBetter is a collaborative drawing application built with modern web technologies. It allows users to create, share, and organize drawings within organizations, with real-time collaboration powered by Convex and Liveblocks.

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/ARYPROGRAMMER/DrawBetter.git
cd draw-better
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Convex

```bash
npx convex dev --once
```

### 4. Environment Setup

Create `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
```

### 5. Start Development

```bash
npm run dev
```

## 📖 Usage

1. **Sign In**: Authenticate with Clerk
2. **Create/Join Organization**: Set up workspace
3. **Create Drawings**: Use drawing tools
4. **Collaborate**: Share with team members
5. **Organize**: Use favorites and search
6. **Manage**: Access dashboard

## 📜 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 📁 Project Structure

```
draw-better/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # UI components
│   ├── ui/               # Base components (Shadcn/ui)
│   ├── auth/             # Auth components
│   └── modals/           # Modal dialogs
├── convex/               # Backend functions & schema
├── hooks/                # Custom React hooks
├── lib/                  # Utilities
├── providers/            # Context providers
├── store/                # Zustand state management
└── public/               # Static assets
```

## 🏗️ System Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    DrawBetter Platform                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Frontend  │  │   Backend   │  │  Database   │         │
│  │             │  │             │  │             │         │
│  │ • Next.js   │  │ • Convex    │  │ • Convex DB │         │
│  │ • React     │  │ • API       │  │ • Real-time │         │
│  │ • TypeScript│  │ • Auth      │  │ • Schema    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Security   │  │ Monitoring  │  │   CDN      │         │
│  │             │  │             │  │             │         │
│  │ • Clerk     │  │ • Analytics │  │ • Vercel    │         │
│  │ • Encryption│  │ • Logging   │  │ • Assets    │         │
│  │ • RBAC      │  │ • Metrics   │  │ • Caching   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

| Feature                        | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| **🎨 Collaborative Drawing**   | Create and edit drawings with real-time collaboration |
| **🏢 Organization Management** | Organize drawings within workspaces                   |
| **⭐ Favorites System**        | Save and quickly access favorite creations            |
| **🔍 Search Functionality**    | Find drawings by title within organizations           |
| **⚡ Live Updates**            | Real-time synchronization via Convex                  |
| **🔐 Authentication**          | Secure login with Clerk                               |
| **📱 Responsive Design**       | Works on desktop, tablet, and mobile                  |

## 🛠️ Technology Stack

<div align="center">

### Frontend

| Component         | Technology    | Version  |
| ----------------- | ------------- | -------- |
| **Framework**     | Next.js       | 15.5.3   |
| **Runtime**       | React         | 19.1.0   |
| **Language**      | TypeScript    | 5.0      |
| **Styling**       | Tailwind CSS  | 4.0      |
| **UI Components** | Radix UI      | Latest   |
| **Animations**    | Framer Motion | 12.23.22 |
| **Icons**         | Lucide React  | 0.544.0  |

### Backend & Database

| Component            | Technology | Version |
| -------------------- | ---------- | ------- |
| **Database**         | Convex     | 1.27.3  |
| **Authentication**   | Clerk      | 6.32.2  |
| **State Management** | Zustand    | 5.0.8   |

### Development Tools

| Component      | Technology | Version |
| -------------- | ---------- | ------- |
| **Linting**    | ESLint     | 9.0     |
| **Build Tool** | Next.js    | 15.5.3  |

</div>


### Performance Optimization

#### Build Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with WebP
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching Strategy**: Aggressive caching with CDN

#### Runtime Optimizations

- **Server-Side Rendering**: ISR for dynamic content
- **Edge Computing**: Global CDN distribution
- **Database Indexing**: Optimized Convex queries
- **Connection Pooling**: Efficient resource management

## 🔒 Security & Compliance

### Authentication & Authorization

- **OAuth 2.0 Integration**: Industry-standard authentication
- **Role-Based Access Control**: Granular permission management
- **Multi-Factor Authentication**: Enhanced security option
- **Session Management**: Secure token handling

### Data Protection

- **Encryption at Rest**: AES-256 encryption for stored data
- **TLS 1.3**: End-to-end encrypted communications
- **Data Sanitization**: Input validation and XSS prevention
- **Audit Logging**: Comprehensive activity tracking

## 🤝 Contributing Guidelines

### Contribution Process

1. **Issue Creation**: Submit detailed bug reports or feature requests
2. **Code Review**: All PRs require review and approval
3. **Documentation**: Update docs
4. **Security Review**: Security implications assessed

## 📄 License & Legal

### License Information

This project is proprietary software owned by Arya Singh. All rights reserved.

## 🗺️ Roadmap & Vision

### Q4 2025: Enhanced Collaboration

- Advanced drawing tools (brushes, layers, effects)
- Voice/video collaboration features
- Advanced permission management
- Mobile native applications

### Q1 2026: AI Integration

- AI-powered drawing assistance
- Smart canvas analysis
- Automated design suggestions
- Content generation tools

### Q2 2026: Enterprise Scale

- Multi-region deployment
- Advanced analytics dashboard
- Custom integrations framework
- Enterprise SSO support

## 📞 Support & Contact

### Contact Information

- **Primary Contact**: Arya Singh
- **Email**: [arya.2023ug1104@iiitranchi.ac.in](mailto:arya.2023ug1104@iiitranchi.ac.in)
- **Issue Tracking**: [GitHub Issues](https://github.com/ARYPROGRAMMER/DrawBetter/issues)

---

<div align="center">
  <p><strong>DrawBetter™</strong> - Where Creativity Meets Collaboration</p>
  <p><em>© 2025 Arya Singh. All rights reserved.</em></p>
</div>
