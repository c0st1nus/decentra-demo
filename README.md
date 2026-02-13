# Decentrathon 5.0 - Demo Hero Page

> **Built for Builders.** Kazakhstan's national hackathon returns on a national scale.
>
> _Demo hero page crafted by **c0st1nus** (depa team)._

## 🚀 Overview

This project is a high-performance, visually immersive hero page for **Decentrathon 5.0**. It features a modern, tech-centric design with interactive elements, smooth animations, and a responsive layout optimized for all devices.

The application is built using **Next.js 15** (App Router) / **React 18** and styled with **Tailwind CSS 4** and **HeroUI**.

## ✨ Key Features

- **⚡ Modern Tech Stack**: Built on the bleeding edge with Next.js 15 and Tailwind 4.
- **🎨 Interactive UI**:
  - **Neural Network Background**: A custom canvas-based particle animation with mouse interaction (`components/neural-network-bg.tsx`).
  - **Terminal Typing Effect**: A retro-style typing animation for the main headline (`components/terminal-input.tsx`).
  - **Interactive Map**: "Hack From Your City" section featuring clickable regions for 20+ cities (`components/map-section.tsx`).
- **⏳ Countdown Timer**: Dynamic countdown to the event launch event (`components/countdown-timer.tsx`).
- **🧩 Component Library**: Utilizes **HeroUI** for accessible and beautiful pre-built components (Navbar, Accordion, etc.).
- **🎭 Smooth Animations**: Powered by **Framer Motion** for fluid transitions and entrance effects.
- **📱 Fully Responsive**: Optimized mobile, tablet, and desktop views.

## 🛠️ Technical Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [HeroUI](https://heroui.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: ESLint, Prettier

## 📦 Getting Started

This project uses **[Bun](https://bun.sh/)** as the package manager and runtime.

### Prerequisites

- [Bun](https://bun.sh/docs/installation) (v1.0 or later)
- Node.js (v18.17+ required for Next.js 15, though Bun handles runtime)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/c0st1nus/decentra-demo.git
cd decentra-proj
bun install
```

### Development

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

The project is optimized for deployment using **PM2** for process management.

### Build

First, build the production application:

```bash
bun run build
```

### Start with PM2

Use PM2 to keep the application running in production:

```bash
pm2 start "bun start" --name decentra-hero
```

Or if you prefer using `npm` with PM2:

```bash
pm2 start npm --name "decentra-hero" -- start
```

### Management

- **View Status**: `pm2 status`
- **Monitor Logs**: `pm2 logs decentra-hero`
- **Restart**: `pm2 restart decentra-hero`
- **Stop**: `pm2 stop decentra-hero`

## 📂 Project Structure

```sh
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── map-section.tsx       # Interactive map logic
│   ├── neural-network-bg.tsx # Canvas background animation
│   └── ...
├── config/               # Site configuration and data
│   ├── site.ts               # Metadata, nav items, regions data
│   └── fonts.ts              # Font configurations
├── public/               # Static assets (images, favicon)
└── styles/               # Global styles (Tailwind)
```
