// Advanced Theme configuration for SimpleStock - 2025 Edition
export const theme2025 = {
	// Modern color scheme with support for light and dark modes
	colors: {
		// Core brand colors with expanded palette
		primary: {
			50: "#eff6ff",
			100: "#dbeafe",
			200: "#bfdbfe",
			300: "#93c5fd",
			400: "#60a5fa",
			500: "#3b82f6",
			600: "#2563eb", // Main brand color
			700: "#1d4ed8",
			800: "#1e40af",
			900: "#1e3a8a",
			950: "#172554",
			DEFAULT: "#2563eb",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
		},

		// Secondary palette with more variations
		secondary: {
			50: "#f8fafc",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569", // Main secondary color
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			950: "#020617",
			DEFAULT: "#475569",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
		},

		// Modern accent colors for 2025
		accent: {
			teal: {
				light: "#5eead4",
				main: "#0d9488",
				dark: "#0f766e",
				contrast: "#ffffff",
				gradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
			},
			amber: {
				light: "#fbbf24",
				main: "#d97706",
				dark: "#b45309",
				contrast: "#ffffff",
				gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
			},
			rose: {
				light: "#fb7185",
				main: "#e11d48",
				dark: "#be123c",
				contrast: "#ffffff",
				gradient: "linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)",
			},
			purple: {
				light: "#c4b5fd",
				main: "#8b5cf6",
				dark: "#7c3aed",
				contrast: "#ffffff",
				gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
			},
		},

		// Semantic colors
		success: {
			light: "#86efac",
			main: "#10b981",
			dark: "#059669",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
		},
		error: {
			light: "#fca5a5",
			main: "#ef4444",
			dark: "#b91c1c",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
		},
		warning: {
			light: "#fcd34d",
			main: "#f59e0b",
			dark: "#d97706",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
		},
		info: {
			light: "#93c5fd",
			main: "#3b82f6",
			dark: "#2563eb",
			contrast: "#ffffff",
			gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
		},

		// Neutral palette (expanded for 2025)
		gray: {
			50: "#f9fafb",
			100: "#f3f4f6",
			200: "#e5e7eb",
			300: "#d1d5db",
			400: "#9ca3af",
			500: "#6b7280",
			600: "#4b5563",
			700: "#374151",
			800: "#1f2937",
			900: "#111827",
			950: "#030712",
		},

		// 2025 UI requires dark mode support
		modes: {
			dark: {
				background: "#0f172a",
				surface: "#1e293b",
				surfaceVariant: "#1e293b",
				text: {
					primary: "#f8fafc",
					secondary: "#cbd5e1",
					disabled: "#64748b",
				},
				divider: "rgba(148, 163, 184, 0.12)",
				elevation: {
					1: "rgba(0, 0, 0, 0.2)",
					2: "rgba(0, 0, 0, 0.25)",
					3: "rgba(0, 0, 0, 0.3)",
				},
			},
			light: {
				background: "#ffffff",
				surface: "#ffffff",
				surfaceVariant: "#f8fafc",
				text: {
					primary: "#0f172a",
					secondary: "#334155",
					disabled: "#94a3b8",
				},
				divider: "rgba(0, 0, 0, 0.12)",
				elevation: {
					1: "rgba(0, 0, 0, 0.05)",
					2: "rgba(0, 0, 0, 0.08)",
					3: "rgba(0, 0, 0, 0.11)",
				},
			},
		},
	},

	// Expanded spacing scale for 2025
	spacing: {
		px: "1px",
		0: "0px",
		0.5: "0.125rem", // 2px
		1: "0.25rem", // 4px
		1.5: "0.375rem", // 6px
		2: "0.5rem", // 8px
		2.5: "0.625rem", // 10px
		3: "0.75rem", // 12px
		3.5: "0.875rem", // 14px
		4: "1rem", // 16px
		5: "1.25rem", // 20px
		6: "1.5rem", // 24px
		7: "1.75rem", // 28px
		8: "2rem", // 32px
		9: "2.25rem", // 36px
		10: "2.5rem", // 40px
		11: "2.75rem", // 44px
		12: "3rem", // 48px
		14: "3.5rem", // 56px
		16: "4rem", // 64px
		20: "5rem", // 80px
		24: "6rem", // 96px
		28: "7rem", // 112px
		32: "8rem", // 128px
		36: "9rem", // 144px
		40: "10rem", // 160px
		44: "11rem", // 176px
		48: "12rem", // 192px
		52: "13rem", // 208px
		56: "14rem", // 224px
		60: "15rem", // 240px
		64: "16rem", // 256px
		72: "18rem", // 288px
		80: "20rem", // 320px
		96: "24rem", // 384px
	},

	// Modern 2025 border radius with more options for organic shapes
	borderRadius: {
		none: "0",
		xs: "0.125rem", // 2px
		sm: "0.25rem", // 4px
		md: "0.375rem", // 6px
		lg: "0.5rem", // 8px
		xl: "0.75rem", // 12px
		"2xl": "1rem", // 16px
		"3xl": "1.5rem", // 24px
		"4xl": "2rem", // 32px
		full: "9999px",
		// 2025 organic shapes
		blob: "60% 40% 40% 60% / 60% 30% 70% 40%",
		organic1: "30% 70% 70% 30% / 53% 30% 70% 47%",
		organic2: "66% 34% 31% 69% / 57% 59% 41% 43%",
	},

	// Enhanced shadows with 2025 depth effects and light modes
	shadows: {
		sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
		DEFAULT:
			"0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
		md: "0px 4px 6px -1px rgba(0, 0, 0, 0.07), 0px 2px 4px -2px rgba(0, 0, 0, 0.05)",
		lg: "0px 10px 15px -3px rgba(0, 0, 0, 0.08), 0px 4px 6px -4px rgba(0, 0, 0, 0.03)",
		xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.08), 0px 8px 10px -6px rgba(0, 0, 0, 0.03)",
		"2xl": "0px 25px 50px -12px rgba(0, 0, 0, 0.1)",
		inner: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.05)",
		// 2025 modern shadows with colored effects
		glow: {
			primary: "0px 0px 20px rgba(59, 130, 246, 0.25)",
			success: "0px 0px 20px rgba(16, 185, 129, 0.25)",
			warning: "0px 0px 20px rgba(245, 158, 11, 0.25)",
			error: "0px 0px 20px rgba(239, 68, 68, 0.25)",
		},
		subtle: "0px 1px 3px rgba(0, 0, 0, 0.04), 0px 6px 16px rgba(0, 0, 0, 0.04)",
		glass: "0 8px 32px 0 rgba(31, 38, 135, 0.09)",
		neumorph: "10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff",
	},

	// 2025 glass effects
	glass: {
		standard:
			"backdrop-filter: blur(16px); background-color: rgba(255, 255, 255, 0.7);",
		dark: "backdrop-filter: blur(16px); background-color: rgba(15, 23, 42, 0.7);",
		thin: "backdrop-filter: blur(8px); background-color: rgba(255, 255, 255, 0.5);",
		thinDark:
			"backdrop-filter: blur(8px); background-color: rgba(15, 23, 42, 0.5);",
	},

	// 2025 typography system
	typography: {
		fontFamily: {
			sans: 'var(--font-sans, "Inter Variable", "Plus Jakarta Sans Variable", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif)',
			display:
				'var(--font-display, "Outfit Variable", "General Sans Variable", system-ui, sans-serif)',
			mono: 'var(--font-mono, "JetBrains Mono Variable", "Fira Code Variable", "Roboto Mono", monospace)',
		},
		fontSizes: {
			xs: "0.75rem", // 12px
			sm: "0.875rem", // 14px
			base: "1rem", // 16px
			lg: "1.125rem", // 18px
			xl: "1.25rem", // 20px
			"2xl": "1.5rem", // 24px
			"3xl": "1.875rem", // 30px
			"4xl": "2.25rem", // 36px
			"5xl": "3rem", // 48px
			"6xl": "3.75rem", // 60px
			"7xl": "4.5rem", // 72px
			"8xl": "6rem", // 96px
			"9xl": "8rem", // 128px
		},
		fontWeights: {
			thin: "100",
			extralight: "200",
			light: "300",
			normal: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
			extrabold: "800",
			black: "900",
		},
		lineHeights: {
			none: "1",
			tight: "1.1",
			snug: "1.25",
			normal: "1.5",
			relaxed: "1.625",
			loose: "2",
		},
		letterSpacing: {
			tighter: "-0.05em",
			tight: "-0.025em",
			normal: "0em",
			wide: "0.025em",
			wider: "0.05em",
			widest: "0.1em",
		},
	},

	// 2025 animations and transitions
	transitions: {
		DEFAULT: "0.15s cubic-bezier(0.4, 0, 0.2, 1)",
		fast: "0.1s cubic-bezier(0.4, 0, 0.2, 1)",
		normal: "0.2s cubic-bezier(0.4, 0, 0.2, 1)",
		slow: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		slower: "0.5s cubic-bezier(0.4, 0, 0.2, 1)",
		bounce: "0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
		spring: "0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
	},

	animations: {
		keyframes: {
			fadeIn: {
				from: { opacity: 0 },
				to: { opacity: 1 },
			},
			slideInFromRight: {
				from: { transform: "translateX(1rem)", opacity: 0 },
				to: { transform: "translateX(0)", opacity: 1 },
			},
			slideInFromLeft: {
				from: { transform: "translateX(-1rem)", opacity: 0 },
				to: { transform: "translateX(0)", opacity: 1 },
			},
			slideInFromBottom: {
				from: { transform: "translateY(1rem)", opacity: 0 },
				to: { transform: "translateY(0)", opacity: 1 },
			},
			shimmer: {
				"0%": { backgroundPosition: "-1000px 0" },
				"100%": { backgroundPosition: "1000px 0" },
			},
			pulse: {
				"0%, 100%": { opacity: 1 },
				"50%": { opacity: 0.5 },
			},
			bounce: {
				"0%, 100%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-10px)" },
			},
			spin: {
				from: { transform: "rotate(0deg)" },
				to: { transform: "rotate(360deg)" },
			},
			float: {
				"0%, 100%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-10px)" },
			},
			breathe: {
				"0%, 100%": { transform: "scale(1)" },
				"50%": { transform: "scale(1.03)" },
			},
		},
		variants: {
			fadeIn: "fadeIn 0.3s ease-out",
			slideIn: "slideInFromRight 0.4s ease-out",
			slideInLeft: "slideInFromLeft 0.4s ease-out",
			slideUp: "slideInFromBottom 0.4s ease-out",
			shimmer: "shimmer 2.5s infinite linear",
			pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			bounce: "bounce 2s infinite",
			spin: "spin 1s linear infinite",
			float: "float 3s ease-in-out infinite",
			breathe: "breathe 3s ease-in-out infinite",
		},
	},

	// Screen breakpoints for 2025 (with larger screens becoming more common)
	breakpoints: {
		xs: "320px",
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
		"3xl": "1920px",
		"4xl": "2560px",
	},

	// Modern component styles
	components: {
		button: {
			variants: {
				// Primary buttons
				primary: {
					backgroundColor: "var(--color-primary-600)",
					color: "#ffffff",
					fontWeight: "var(--font-weight-medium)",
					borderRadius: "var(--radius-md)",
					padding: "var(--spacing-2) var(--spacing-4)",
					transition: "var(--transition)",
					boxShadow: "var(--shadow-sm)",
					position: "relative",
					overflow: "hidden",
					"&:hover": {
						backgroundColor: "var(--color-primary-700)",
						transform: "translateY(-1px)",
						boxShadow: "var(--shadow-md)",
					},
					"&:active": {
						backgroundColor: "var(--color-primary-800)",
						transform: "translateY(0px)",
						boxShadow: "var(--shadow-sm)",
					},
					"&:focus": {
						outline: "2px solid var(--color-primary-300)",
						outlineOffset: "2px",
					},
					"&:disabled": {
						opacity: 0.6,
						cursor: "not-allowed",
						transform: "none",
						"&:hover": {
							boxShadow: "var(--shadow-sm)",
							backgroundColor: "var(--color-primary-600)",
						},
					},
				},

				// Secondary buttons
				secondary: {
					backgroundColor: "var(--color-gray-100)",
					color: "var(--color-gray-800)",
					fontWeight: "var(--font-weight-medium)",
					borderRadius: "var(--radius-md)",
					padding: "var(--spacing-2) var(--spacing-4)",
					transition: "var(--transition)",
					boxShadow: "var(--shadow-sm)",
					border: "1px solid var(--color-gray-200)",
					"&:hover": {
						backgroundColor: "var(--color-gray-200)",
						transform: "translateY(-1px)",
						boxShadow: "var(--shadow-md)",
					},
					"&:active": {
						backgroundColor: "var(--color-gray-300)",
						transform: "translateY(0px)",
					},
					"&:focus": {
						outline: "2px solid var(--color-gray-300)",
						outlineOffset: "2px",
					},
					"&:disabled": {
						opacity: 0.6,
						cursor: "not-allowed",
						transform: "none",
						"&:hover": {
							boxShadow: "var(--shadow-sm)",
							backgroundColor: "var(--color-gray-100)",
						},
					},
				},

				// Ghost button variant
				ghost: {
					backgroundColor: "transparent",
					color: "var(--color-gray-700)",
					fontWeight: "var(--font-weight-medium)",
					borderRadius: "var(--radius-md)",
					padding: "var(--spacing-2) var(--spacing-4)",
					transition: "var(--transition)",
					"&:hover": {
						backgroundColor: "var(--color-gray-100)",
					},
					"&:active": {
						backgroundColor: "var(--color-gray-200)",
					},
					"&:focus": {
						outline: "2px solid var(--color-gray-300)",
						outlineOffset: "2px",
					},
					"&:disabled": {
						opacity: 0.6,
						cursor: "not-allowed",
					},
				},

				// Modern outlined buttons
				outline: {
					backgroundColor: "transparent",
					color: "var(--color-primary-600)",
					fontWeight: "var(--font-weight-medium)",
					borderRadius: "var(--radius-md)",
					padding: "var(--spacing-2) var(--spacing-4)",
					transition: "var(--transition)",
					border: "1px solid var(--color-primary-600)",
					"&:hover": {
						backgroundColor: "var(--color-primary-50)",
						transform: "translateY(-1px)",
					},
					"&:active": {
						backgroundColor: "var(--color-primary-100)",
						transform: "translateY(0px)",
					},
					"&:focus": {
						outline: "2px solid var(--color-primary-300)",
						outlineOffset: "2px",
					},
					"&:disabled": {
						opacity: 0.6,
						cursor: "not-allowed",
						transform: "none",
					},
				},

				// Modern glass effect buttons
				glass: {
					backdropFilter: "blur(8px)",
					backgroundColor: "rgba(255, 255, 255, 0.7)",
					color: "var(--color-gray-800)",
					fontWeight: "var(--font-weight-medium)",
					borderRadius: "var(--radius-md)",
					padding: "var(--spacing-2) var(--spacing-4)",
					transition: "var(--transition)",
					boxShadow: "var(--shadow-sm)",
					border: "1px solid rgba(255, 255, 255, 0.3)",
					"&:hover": {
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						transform: "translateY(-1px)",
						boxShadow: "var(--shadow-md)",
					},
					"&:active": {
						backgroundColor: "rgba(255, 255, 255, 0.9)",
						transform: "translateY(0px)",
					},
					"&:focus": {
						outline: "2px solid rgba(255, 255, 255, 0.5)",
						outlineOffset: "2px",
					},
					"&:disabled": {
						opacity: 0.6,
						cursor: "not-allowed",
						transform: "none",
					},
				},
			},

			// Button sizes
			sizes: {
				xs: {
					fontSize: "var(--font-size-xs)",
					padding: "var(--spacing-1) var(--spacing-2)",
					borderRadius: "var(--radius-sm)",
				},
				sm: {
					fontSize: "var(--font-size-sm)",
					padding: "var(--spacing-1-5) var(--spacing-3)",
					borderRadius: "var(--radius-md)",
				},
				md: {
					fontSize: "var(--font-size-base)",
					padding: "var(--spacing-2) var(--spacing-4)",
					borderRadius: "var(--radius-md)",
				},
				lg: {
					fontSize: "var(--font-size-lg)",
					padding: "var(--spacing-2-5) var(--spacing-5)",
					borderRadius: "var(--radius-lg)",
				},
				xl: {
					fontSize: "var(--font-size-xl)",
					padding: "var(--spacing-3) var(--spacing-6)",
					borderRadius: "var(--radius-xl)",
				},
			},
		},

		// Modern card styles
		card: {
			variants: {
				// Standard card
				default: {
					backgroundColor: "var(--color-background)",
					borderRadius: "var(--radius-xl)",
					boxShadow: "var(--shadow-md)",
					padding: "var(--spacing-6)",
					transition: "var(--transition)",
					overflow: "hidden",
					"&:hover": {
						boxShadow: "var(--shadow-lg)",
						transform: "translateY(-2px)",
					},
				},

				// Modern minimalist card
				flat: {
					backgroundColor: "var(--color-background)",
					borderRadius: "var(--radius-lg)",
					border: "1px solid var(--color-gray-200)",
					padding: "var(--spacing-6)",
					transition: "var(--transition)",
				},

				// Glass effect card (popular in 2025)
				glass: {
					backdropFilter: "blur(16px)",
					backgroundColor: "rgba(255, 255, 255, 0.7)",
					borderRadius: "var(--radius-xl)",
					border: "1px solid rgba(255, 255, 255, 0.3)",
					boxShadow: "var(--shadow-glass)",
					padding: "var(--spacing-6)",
					transition: "var(--transition)",
					"&:hover": {
						boxShadow: "var(--shadow-lg)",
						backgroundColor: "rgba(255, 255, 255, 0.8)",
					},
				},

				// Neumorphism card (still used in 2025 for specific aesthetics)
				neumorph: {
					backgroundColor: "#ecf0f3",
					borderRadius: "var(--radius-xl)",
					boxShadow: "var(--shadow-neumorph)",
					padding: "var(--spacing-6)",
					transition: "var(--transition)",
				},

				// Interactive card with hover effects
				interactive: {
					backgroundColor: "var(--color-background)",
					borderRadius: "var(--radius-xl)",
					boxShadow: "var(--shadow-md)",
					padding: "var(--spacing-6)",
					transition: "var(--transition)",
					cursor: "pointer",
					overflow: "hidden",
					position: "relative",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background:
							"linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%)",
						opacity: 0,
						transition: "var(--transition)",
					},
					"&:hover": {
						boxShadow: "var(--shadow-lg)",
						transform: "translateY(-2px)",
						"&::before": {
							opacity: 1,
						},
					},
					"&:active": {
						transform: "translateY(0px)",
						boxShadow: "var(--shadow-sm)",
					},
				},
			},
		},

		// Modern input styles
		input: {
			variants: {
				default: {
					backgroundColor: "var(--color-background)",
					borderRadius: "var(--radius-md)",
					border: "1px solid var(--color-gray-300)",
					padding: "var(--spacing-2) var(--spacing-4)",
					fontSize: "var(--font-size-base)",
					lineHeight: "1.5",
					transition: "var(--transition)",
					width: "100%",
					color: "var(--color-gray-900)",
					"&:focus": {
						outline: "none",
						borderColor: "var(--color-primary-500)",
						boxShadow: "0 0 0 3px var(--color-primary-100)",
					},
					"&:disabled": {
						backgroundColor: "var(--color-gray-100)",
						color: "var(--color-gray-500)",
						cursor: "not-allowed",
					},
					"&::placeholder": {
						color: "var(--color-gray-400)",
					},
				},

				// Modern filled input (Material style)
				filled: {
					backgroundColor: "var(--color-gray-100)",
					borderRadius: "var(--radius-md)",
					border: "1px solid transparent",
					padding: "var(--spacing-2) var(--spacing-4)",
					fontSize: "var(--font-size-base)",
					lineHeight: "1.5",
					transition: "var(--transition)",
					width: "100%",
					color: "var(--color-gray-900)",
					"&:focus": {
						outline: "none",
						borderBottomColor: "var(--color-primary-500)",
						backgroundColor: "var(--color-gray-50)",
						boxShadow: "0 1px 0 0 var(--color-primary-500)",
					},
					"&:disabled": {
						backgroundColor: "var(--color-gray-100)",
						color: "var(--color-gray-500)",
						cursor: "not-allowed",
					},
					"&::placeholder": {
						color: "var(--color-gray-400)",
					},
				},

				// Minimalist input style
				minimal: {
					backgroundColor: "transparent",
					borderRadius: "0",
					border: "none",
					borderBottom: "1px solid var(--color-gray-300)",
					padding: "var(--spacing-2) var(--spacing-1)",
					fontSize: "var(--font-size-base)",
					lineHeight: "1.5",
					transition: "var(--transition)",
					width: "100%",
					color: "var(--color-gray-900)",
					"&:focus": {
						outline: "none",
						borderBottomColor: "var(--color-primary-500)",
						borderBottomWidth: "2px",
					},
					"&:disabled": {
						color: "var(--color-gray-500)",
						cursor: "not-allowed",
						borderBottomStyle: "dashed",
					},
					"&::placeholder": {
						color: "var(--color-gray-400)",
					},
				},
			},
		},

		// Table styling
		table: {
			variants: {
				default: {
					width: "100%",
					borderCollapse: "separate",
					borderSpacing: 0,

					// Table header
					thead: {
						backgroundColor: "var(--color-gray-50)",
						th: {
							padding: "var(--spacing-4)",
							fontSize: "var(--font-size-sm)",
							fontWeight: "var(--font-weight-semibold)",
							color: "var(--color-gray-600)",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							borderBottom: "1px solid var(--color-gray-200)",
							textAlign: "left",
						},
					},

					// Table body
					tbody: {
						tr: {
							borderBottom: "1px solid var(--color-gray-200)",
							transition: "var(--transition)",
							"&:hover": {
								backgroundColor: "var(--color-gray-50)",
							},
							"&:last-child": {
								borderBottom: "none",
							},
							// Alternating row colors
							"&:nth-of-type(even)": {
								backgroundColor: "var(--color-gray-50)",
								"&:hover": {
									backgroundColor: "var(--color-gray-100)",
								},
							},
						},
						td: {
							padding: "var(--spacing-4)",
							fontSize: "var(--font-size-sm)",
							color: "var(--color-gray-800)",
							verticalAlign: "middle",
						},
					},
				},

				// Modern clean table
				clean: {
					width: "100%",
					borderCollapse: "separate",
					borderSpacing: 0,

					thead: {
						th: {
							padding: "var(--spacing-4)",
							fontSize: "var(--font-size-sm)",
							fontWeight: "var(--font-weight-medium)",
							color: "var(--color-gray-500)",
							borderBottom: "1px solid var(--color-gray-200)",
							textAlign: "left",
						},
					},

					tbody: {
						tr: {
							borderBottom: "1px solid var(--color-gray-100)",
							transition: "var(--transition)",
							"&:hover": {
								backgroundColor: "var(--color-gray-50)",
							},
							"&:last-child": {
								borderBottom: "none",
							},
						},
						td: {
							padding: "var(--spacing-4)",
							fontSize: "var(--font-size-sm)",
							color: "var(--color-gray-800)",
							verticalAlign: "middle",
						},
					},
				},
			},
		},
	},
};

// Helper functions for theme management
export const getNestedProperty = (obj, path) => {
	if (!path) return undefined;
	const properties = path.split(".");
	return properties.reduce((prev, curr) => {
		return prev && prev[curr] !== undefined ? prev[curr] : undefined;
	}, obj);
};

// Create CSS variables from theme
export const generateCssVariables = (theme) => {
	let cssVars = [];

	// Process colors
	Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
		if (colorName === "modes") return; // Skip modes, handle separately

		if (typeof colorValue === "object" && colorValue !== null) {
			Object.entries(colorValue).forEach(([shade, value]) => {
				// Skip nested objects in colors
				if (typeof value !== "object") {
					cssVars.push(`--color-${colorName}-${shade}: ${value};`);
				}
			});
		} else {
			cssVars.push(`--color-${colorName}: ${colorValue};`);
		}
	});

	// Process spacing
	Object.entries(theme.spacing).forEach(([key, value]) => {
		cssVars.push(`--spacing-${key}: ${value};`);
	});

	// Process border radius
	Object.entries(theme.borderRadius).forEach(([key, value]) => {
		cssVars.push(`--radius-${key}: ${value};`);
	});

	// Process shadows
	Object.entries(theme.shadows).forEach(([key, value]) => {
		if (typeof value === "object" && value !== null) {
			Object.entries(value).forEach(([subKey, subValue]) => {
				cssVars.push(`--shadow-${key}-${subKey}: ${subValue};`);
			});
		} else {
			cssVars.push(`--shadow-${key}: ${value};`);
		}
	});

	// Process typography
	Object.entries(theme.typography).forEach(([category, values]) => {
		if (typeof values === "object" && values !== null) {
			Object.entries(values).forEach(([key, value]) => {
				cssVars.push(`--font-${category}-${key}: ${value};`);
			});
		}
	});

	// Process transitions
	Object.entries(theme.transitions).forEach(([key, value]) => {
		const transitionKey =
			key === "DEFAULT" ? "transition" : `transition-${key}`;
		cssVars.push(`--${transitionKey}: ${value};`);
	});

	return (
		`:root {\n  ${cssVars.join("\n  ")}\n}\n\n` +
		// Add dark mode variables
		`@media (prefers-color-scheme: dark) {\n  :root {\n    --color-background: ${theme.colors.modes.dark.background};\n    --color-surface: ${theme.colors.modes.dark.surface};\n    --color-surface-variant: ${theme.colors.modes.dark.surfaceVariant};\n    --color-text-primary: ${theme.colors.modes.dark.text.primary};\n    --color-text-secondary: ${theme.colors.modes.dark.text.secondary};\n    --color-text-disabled: ${theme.colors.modes.dark.text.disabled};\n    --color-divider: ${theme.colors.modes.dark.divider};\n    /* More dark mode variables */\n  }\n}`
	);
};

// Export modern style objects from theme
export const createStylesFromTheme = (theme) => {
	return {
		// Modern card component styles
		card: {
			default: {
				backgroundColor: "white",
				borderRadius: theme.borderRadius.xl,
				boxShadow: theme.shadows.md,
				padding: theme.spacing[6],
				transition: theme.transitions.DEFAULT,
				overflow: "hidden",
			},
			glass: {
				backdropFilter: "blur(16px)",
				backgroundColor: "rgba(255, 255, 255, 0.7)",
				borderRadius: theme.borderRadius.xl,
				border: "1px solid rgba(255, 255, 255, 0.3)",
				boxShadow: theme.shadows.glass,
				padding: theme.spacing[6],
				transition: theme.transitions.DEFAULT,
			},
		},

		// Button styles
		button: {
			base: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				fontWeight: theme.typography.fontWeights.medium,
				borderRadius: theme.borderRadius.md,
				transition: theme.transitions.DEFAULT,
				cursor: "pointer",
			},
			primary: {
				backgroundColor: theme.colors.primary[600],
				color: "#ffffff",
				"&:hover": {
					backgroundColor: theme.colors.primary[700],
					transform: "translateY(-1px)",
					boxShadow: theme.shadows.md,
				},
			},
			secondary: {
				backgroundColor: theme.colors.gray[100],
				color: theme.colors.gray[800],
				border: `1px solid ${theme.colors.gray[200]}`,
				"&:hover": {
					backgroundColor: theme.colors.gray[200],
				},
			},
			sizes: {
				sm: {
					fontSize: theme.typography.fontSizes.sm,
					padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
				},
				md: {
					fontSize: theme.typography.fontSizes.base,
					padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
				},
				lg: {
					fontSize: theme.typography.fontSizes.lg,
					padding: `${theme.spacing[2.5]} ${theme.spacing[5]}`,
				},
			},
		},

		// Form input styles
		input: {
			default: {
				width: "100%",
				padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
				backgroundColor: "white",
				borderRadius: theme.borderRadius.md,
				border: `1px solid ${theme.colors.gray[300]}`,
				fontSize: theme.typography.fontSizes.base,
				lineHeight: theme.typography.lineHeights.normal,
				transition: theme.transitions.DEFAULT,
				"&:focus": {
					outline: "none",
					borderColor: theme.colors.primary[500],
					boxShadow: `0 0 0 3px ${theme.colors.primary[100]}`,
				},
			},
		},

		// Table styles
		table: {
			container: {
				width: "100%",
				overflow: "auto",
				borderRadius: theme.borderRadius.lg,
				boxShadow: theme.shadows.sm,
			},
			table: {
				width: "100%",
				borderCollapse: "separate",
				borderSpacing: 0,
			},
			header: {
				backgroundColor: theme.colors.gray[50],
			},
			headerCell: {
				padding: theme.spacing[4],
				fontSize: theme.typography.fontSizes.sm,
				fontWeight: theme.typography.fontWeights.semibold,
				color: theme.colors.gray[600],
				textTransform: "uppercase",
				letterSpacing: "0.05em",
				borderBottom: `1px solid ${theme.colors.gray[200]}`,
				textAlign: "left",
			},
			row: {
				borderBottom: `1px solid ${theme.colors.gray[200]}`,
				transition: "background-color 0.2s",
				"&:hover": {
					backgroundColor: theme.colors.gray[50],
				},
			},
			rowActive: {
				backgroundColor: `${theme.colors.primary[50]}`,
				borderLeft: `3px solid ${theme.colors.primary[600]}`,
			},
			cell: {
				padding: theme.spacing[4],
				fontSize: theme.typography.fontSizes.sm,
				color: theme.colors.gray[700],
			},
		},
	};
};

// Create theme object with styles
theme2025.styles = createStylesFromTheme(theme2025);

export default theme2025;
