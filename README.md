# Arinjay Bhola - Portfolio

A modern, responsive portfolio website built with React 18, TypeScript, and Tailwind CSS, featuring smooth animations, glassmorphism effects, and a comprehensive design system.

## ✨ Features

- **Modern Design System**: Built with a custom component library using Radix UI primitives
- **Responsive Layout**: Fully responsive design that works seamlessly on all devices
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Smooth Animations**: Powered by Framer Motion with micro-interactions
- **Glassmorphism Effects**: Modern glass-like UI components with backdrop blur
- **Interactive Components**: Hover states, loading states, and smooth transitions
- **Optimized Performance**: Lazy loading, optimized images, and efficient animations
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast development server and production build tool
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens

### UI & Animation
- **Radix UI** - Unstyled, accessible component primitives
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit
- **Class Variance Authority** - Type-safe variant-based styling
- **Tailwind Merge** - Utility function to merge Tailwind classes

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS transformation pipeline
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── theme-toggle.tsx
│   │   └── background-pattern.tsx
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact form and info
│   ├── Experience.tsx       # Work experience timeline
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Navigation header
│   ├── Info.tsx            # Hero section
│   └── Project.tsx         # Projects showcase
├── lib/
│   ├── theme-provider.tsx    # Theme context and provider
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main app component
├── main.tsx                # App entry point
└── index.css               # Global styles and design tokens
```

## 🎨 Design System

The portfolio uses a comprehensive design system with:

- **Color Palette**: Consistent color tokens for light and dark themes
- **Typography**: Inter, Space Grotesk, and JetBrains Mono fonts
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Components**: Reusable UI components with multiple variants
- **Animations**: Custom keyframe animations and motion presets

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## 🌙 Theme System

Features a comprehensive theme system with:
- Light and dark mode variants
- System preference detection
- Smooth theme transitions
- Persistent theme selection
- Custom CSS variables for design tokens

## 🔧 Customization

The portfolio is highly customizable:

### Colors
Edit the CSS variables in `src/index.css` to customize the color scheme.

### Fonts
Modify the font imports and CSS variables to change typography.

### Components
All UI components are built with variants and can be easily extended.

### Animations
Custom animations are defined in the Tailwind config and can be modified.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

Feel free to reach out through the contact form or social links in the portfolio!

---

Built with ❤️ using modern web technologies
