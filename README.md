# 🌟 Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring smooth animations, mobile-first design, and dedicated sections for web projects and games.

![Portfolio Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Portfolio+Preview)

## ✨ Features

- 📱 **Mobile-First Design** - Fully responsive with touch-optimized navigation
- 🎮 **Dedicated Games Section** - Showcase your games separately from web projects
- ✨ **Smooth Animations** - Scroll-triggered animations using Framer Motion
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 🚀 **Performance Optimized** - Built with Next.js for optimal performance
- 📧 **Contact Form** - Integrated contact form with email functionality

## 🛠️ Tech Stack

- **Framework:** Next.js 13
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Email:** React Email + Resend
- **Language:** TypeScript

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── about.tsx         # About section
│   ├── contact.tsx       # Contact form
│   ├── games.tsx         # Games showcase
│   ├── header.tsx        # Navigation header
│   ├── projects.tsx      # Projects showcase
│   └── ...               # Other components
├── lib/                  # Utilities and data
│   ├── data.ts          # Portfolio data
│   ├── hooks.ts         # Custom hooks
│   └── types.ts         # TypeScript types
├── public/              # Static assets
└── context/             # React contexts
```

## 🎨 Customization

### Adding Projects
Edit `lib/data.ts` to add your projects:

```typescript
export const projectsData = [
  {
    title: "Your Project",
    description: "Project description",
    tags: ["React", "Next.js", "Tailwind"],
    imageUrl: YourProjectImg,
    imagePath: "https://your-project-url.com",
  },
  // ... more projects
];
```

### Adding Games
Add your games to the `gamesData` array:

```typescript
export const gamesData = [
  {
    title: "Your Game",
    description: "Game description",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: YourGameImg,
    imagePath: "https://your-game-url.com",
    category: "Arcade",
  },
  // ... more games
];
```

### Customizing Animations
Use the animation components from `components/scroll-animations.tsx`:

```tsx
import { FadeInUp, StaggerContainer } from './scroll-animations';

<FadeInUp delay={0.2}>
  <YourComponent />
</FadeInUp>
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder** to Netlify

## 📧 Contact Form Setup

To enable the contact form:

1. **Get a Resend API key** from [resend.com](https://resend.com)
2. **Add environment variables**:
   ```env
   RESEND_API_KEY=your_api_key_here
   ```

## 🎯 Performance

- **Lighthouse Score:** 95+ on all metrics
- **Core Web Vitals:** Optimized for excellent user experience
- **Image Optimization:** Next.js Image component with Sharp
- **Code Splitting:** Automatic with Next.js

## 📱 Mobile Features

- **Hamburger Menu:** Clean slide-in navigation
- **Floating Navigation:** Quick access to sections while scrolling
- **Touch Optimized:** Better spacing and touch targets
- **Responsive Images:** Proper mobile image handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

⭐ **Star this repository if you found it helpful!**