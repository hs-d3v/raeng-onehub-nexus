
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Argon Dashboard Colors
                brand: {
                    blue: '#5e72e4',
                    indigo: '#5603ad',
                    purple: '#8965e0',
                    pink: '#f3a4b5',
                    red: '#f5365c',
                    orange: '#fb6340',
                    yellow: '#ffd600',
                    green: '#2dce89',
                    teal: '#11cdef',
                    cyan: '#2bffc6',
                    gray: {
                        100: '#f6f9fc',
                        200: '#e9ecef',
                        300: '#dee2e6',
                        400: '#ced4da',
                        500: '#adb5bd',
                        600: '#8898aa',
                        700: '#525f7f',
                        800: '#32325d',
                        900: '#212529'
                    }
                },
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
            boxShadow: {
                soft: '0 0 1.25rem rgba(31, 45, 61, 0.07)',
                stronger: '0 0 1.25rem rgba(31, 45, 61, 0.15)',
                card: '0 0 2rem 0 rgba(136, 152, 170, 0.15)'
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(87deg, #5e72e4 0, #825ee4 100%)',
                'gradient-secondary': 'linear-gradient(87deg, #f5365c 0, #f56036 100%)',
                'gradient-success': 'linear-gradient(87deg, #2dce89 0, #2dcecc 100%)',
                'gradient-info': 'linear-gradient(87deg, #11cdef 0, #1171ef 100%)',
                'gradient-warning': 'linear-gradient(87deg, #fb6340 0, #fbb140 100%)',
                'gradient-danger': 'linear-gradient(87deg, #f5365c 0, #f56036 100%)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
