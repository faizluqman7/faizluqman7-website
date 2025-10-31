# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - TypeScript compile + Vite production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

Personal portfolio site built with React 19 + TypeScript + Vite. Single-page app with scroll-based animations.

**Component Structure:**
- `App.tsx` - Root component, registers GSAP ScrollTrigger, renders sections in order
- `main.tsx` - Entry point with StrictMode
- Section components in `src/components/`:
  - `NavBar.tsx` - Navigation
  - `HeroSection.tsx` - Landing/intro
  - `About.tsx` - About section
  - `Tech.tsx` - Tech stack
  - `WorkExperience.tsx` - Work timeline
  - `ProjectsSection.tsx` - Projects grid (uses `ProjectCard.tsx`)
  - `Contact.tsx` - Contact info
  - `Bubbles.tsx` - Animated background particles
- `src/data/projects.ts` - Project data array

**Animations:**
- GSAP with ScrollTrigger for scroll-based fade-in effects on `.section` elements
- tsparticles for floating bubble background
- framer-motion and react-simple-typewriter for UI effects

**Assets:**
- Resume PDF in `public/`
- Profile image in `public/face.jpeg`
- Additional images in `src/assets/`

## Key Dependencies

- React 19 with TypeScript
- Bootstrap 5 for styling
- GSAP for scroll animations
- tsparticles for particle effects
- framer-motion for component animations