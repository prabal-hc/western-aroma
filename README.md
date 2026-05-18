<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Western Aroma - Premium Coffee & Spices

A modern, high-performance e-commerce platform for premium Indian coffee and spices with stunning 3D animations and seamless user experience.

## Features

- ✨ **Premium UI/UX** - Beautiful animations with Framer Motion and GSAP
- 🎨 **3D Visuals** - Interactive 3D scenes using Three.js
- 📱 **Responsive Design** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- ⚡ **Optimized** - Image optimization, lazy loading, and performance hints
- 🛒 **Full E-commerce** - Complete shopping cart functionality
- 📝 **Type-Safe** - Built with TypeScript for better DX

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment template and configure:

   ```bash
   cp .env.local.example .env.local
   ```

4. Add your Gemini API key to `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

### Building

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Remove build directory

## Project Structure

```
src/
├── components/        # React components
│   ├── pages/        # Page components
│   ├── ui/           # UI components (empty, ready for expansion)
│   ├── Cart.tsx
│   ├── Navbar.tsx
│   └── ...
├── hooks/            # Custom React hooks
├── services/         # API services
├── styles/           # Global styles
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── App.tsx
└── main.tsx
```

## Code Quality

### Linting

ESLint is configured for:

- React best practices
- TypeScript type checking
- Accessibility compliance
- Hook rules

```bash
npm run lint
```

### Formatting

Code is formatted with Prettier:

```bash
npm run format
```

### Type Checking

Type safety with TypeScript:

```bash
npm run type-check
```

## Accessibility Features

- ✓ Semantic HTML structure
- ✓ ARIA labels and roles
- ✓ Keyboard navigation support
- ✓ Color contrast compliance
- ✓ Alt text for images
- ✓ Proper heading hierarchy

## Performance Optimizations

- 🖼️ Lazy loading images
- 📦 Code splitting
- 🗜️ Image optimization utilities
- ⚡ Hardware acceleration for animations
- 🎯 Optimized re-renders

## Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_ENV=development
VITE_DEBUG=false
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Best Practices

### Component Structure

- Keep components focused and single-purpose
- Use custom hooks for shared logic
- Implement proper TypeScript interfaces
- Add JSDoc comments for complex functions

### Performance

- Use lazy loading for images
- Memoize expensive computations
- Split large components
- Optimize animations

### Accessibility

- Always include alt text for images
- Use semantic HTML elements
- Add ARIA labels for interactive elements
- Test with keyboard navigation

### Styling

- Use Tailwind CSS utilities
- Follow the established color scheme
- Keep responsive design in mind
- Use CSS custom properties for theme values

## Contributing

1. Create a feature branch
2. Follow the code style and structure
3. Test your changes
4. Commit with clear messages
5. Push and create a pull request

## Troubleshooting

### Port already in use

```bash
npm run dev -- --port 3001
```

### Clear cache and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
npm run type-check
```

## License

Proprietary - Western Aroma

## Support

For issues and questions, please open an issue on the repository.
