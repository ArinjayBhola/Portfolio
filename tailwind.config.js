/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)'
          },
          fontFamily: {
              primary: ['var(--font-primary)'],
              display: ['var(--font-display)'],
              mono: ['var(--font-mono)']
          },
          colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              card: {
                  DEFAULT: 'hsl(var(--card))',
                  foreground: 'hsl(var(--card-foreground))'
              },
              popover: {
                  DEFAULT: 'hsl(var(--popover))',
                  foreground: 'hsl(var(--popover-foreground))'
              },
              primary: {
                  DEFAULT: 'hsl(var(--primary))',
                  foreground: 'hsl(var(--primary-foreground))'
              },
              secondary: {
                  DEFAULT: 'hsl(var(--secondary))',
                  foreground: 'hsl(var(--secondary-foreground))'
              },
              muted: {
                  DEFAULT: 'hsl(var(--muted))',
                  foreground: 'hsl(var(--muted-foreground))'
              },
              accent: {
                  DEFAULT: 'hsl(var(--accent))',
                  foreground: 'hsl(var(--accent-foreground))'
              },
              destructive: {
                  DEFAULT: 'hsl(var(--destructive))',
                  foreground: 'hsl(var(--destructive-foreground))'
              },
              border: 'hsl(var(--border))',
              input: 'hsl(var(--input))',
              ring: 'hsl(var(--ring))',
              chart: {
                  '1': 'hsl(var(--chart-1))',
                  '2': 'hsl(var(--chart-2))',
                  '3': 'hsl(var(--chart-3))',
                  '4': 'hsl(var(--chart-4))',
                  '5': 'hsl(var(--chart-5))'
              }
          },
          animation: {
              'fade-in': 'fadeIn 0.6s ease-out',
              'slide-up': 'slideUp 0.6s ease-out',
              'slide-down': 'slideDown 0.6s ease-out',
              'scale-in': 'scaleIn 0.6s ease-out',
              'bounce-gentle': 'bounceGentle 2s infinite',
              'float': 'float 3s ease-in-out infinite',
              'glow': 'glow 2s ease-in-out infinite alternate'
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' }
              },
              slideUp: {
                  '0%': { opacity: '0', transform: 'translateY(20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' }
              },
              slideDown: {
                  '0%': { opacity: '0', transform: 'translateY(-20px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' }
              },
              scaleIn: {
                  '0%': { opacity: '0', transform: 'scale(0.95)' },
                  '100%': { opacity: '1', transform: 'scale(1)' }
              },
              bounceGentle: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' }
              },
              float: {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' }
              },
              glow: {
                  '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
                  '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }
              }
          },
          backdropBlur: {
              xs: '2px',
          }
      }
  },
  plugins: [require("tailwindcss-animate")],
};
