// Theme configuration for SimpleStock - Updated for 2025 Design Standards
export const theme = {
	// Color scheme updated with 2025 design trends - incorporating gradients and richer hues
	colors: {
		primary: {
			main: "#2563eb", // Modern blue for 2025
			light: "#60a5fa",
			lighter: "#93c5fd",
			dark: "#1e40af",
			darker: "#1e3a8a",
			gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
			contrast: "#ffffff",
		},
		secondary: {
			main: "#475569",
			light: "#94a3b8",
			lighter: "#cbd5e1",
			dark: "#334155",
			darker: "#1e293b",
			gradient: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
			contrast: "#ffffff",
		},
		// New accent colors for 2025 highlight elements
		accent: {
			teal: {
				main: "#0d9488",
				light: "#5eead4",
				dark: "#0f766e",
				contrast: "#ffffff",
			},
			amber: {
				main: "#d97706",
				light: "#fbbf24",
				dark: "#b45309",
				contrast: "#ffffff",
			},
			rose: {
				main: "#e11d48",
				light: "#fb7185",
				dark: "#be123c",
				contrast: "#ffffff",
			},
		},
		success: {
			main: "#10b981",
			light: "#34d399",
			dark: "#059669",
			contrast: "#ffffff",
		},
		error: {
			main: "#ef4444",
			light: "#f87171",
			dark: "#b91c1c",
			contrast: "#ffffff",
		},
		warning: {
			main: "#f59e0b",
			light: "#fbbf24",
			dark: "#d97706",
			contrast: "#ffffff",
		},
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
		},
	},
	spacing: {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
		"2xl": "3rem",
	},
	borderRadius: {
		none: "0",
		sm: "0.125rem",
		default: "0.25rem",
		md: "0.375rem",
		lg: "0.5rem",
		xl: "0.75rem",
		"2xl": "1rem",
		full: "9999px",
	},
	shadows: {
		sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
		default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
		md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
		xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
	}, // Typography updated for 2025 - more variable font weights and modern font stacks
	typography: {
		// 2025 font stacks prioritize variable fonts for smoother weight transitions
		fontFamily: {
			sans: 'var(--font-sans, "Inter var", "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif)',
			display:
				'var(--font-display, "Outfit Variable", "General Sans", system-ui, sans-serif)',
			mono: 'var(--font-mono, "JetBrains Mono", "Fira Code", "Roboto Mono", monospace)',
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
		// Modern 2025 line heights for better readability
		lineHeights: {
			none: "1",
			tight: "1.1",
			snug: "1.25",
			normal: "1.5",
			relaxed: "1.625",
			loose: "2",
		},
		// Letter spacing for fine typography control
		letterSpacing: {
			tighter: "-0.05em",
			tight: "-0.025em",
			normal: "0em",
			wide: "0.025em",
			wider: "0.05em",
			widest: "0.1em",
		},
	},
	transitions: {
		default: "0.2s ease",
		slow: "0.3s ease-in-out",
		fast: "0.1s ease",
	},
	breakpoints: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},
};

// Helper functions to use the theme
export const getColor = (path) => {
	const keys = path.split(".");
	let result = theme.colors;

	for (const key of keys) {
		if (result[key] === undefined) return null;
		result = result[key];
	}

	return result;
};

// CSS Variable injection for global use
export const createCssVariables = () => {
	const variables = [];

	// Add color variables
	Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
		if (typeof colorValue === "object") {
			Object.entries(colorValue).forEach(([shade, value]) => {
				variables.push(`--color-${colorName}-${shade}: ${value};`);
			});
		} else {
			variables.push(`--color-${colorName}: ${colorValue};`);
		}
	});

	// Add spacing variables
	Object.entries(theme.spacing).forEach(([key, value]) => {
		variables.push(`--spacing-${key}: ${value};`);
	});

	// Add border radius variables
	Object.entries(theme.borderRadius).forEach(([key, value]) => {
		variables.push(`--radius-${key === "default" ? "base" : key}: ${value};`);
	});

	return `:root {\n  ${variables.join("\n  ")}\n}`;
};

// Common style objects for reuse
// Defining styles before adding to theme
const styleObjects = {
	card: {
		backgroundColor: "white",
		borderRadius: theme.borderRadius.lg,
		boxShadow: theme.shadows.md,
		padding: theme.spacing.lg,
		transition: theme.transitions.default,
	},
	input: {
		width: "100%",
		padding: `${theme.spacing.sm} ${theme.spacing.md}`,
		borderRadius: theme.borderRadius.md,
		border: `1px solid ${theme.colors.gray[300]}`,
		fontSize: theme.typography.fontSizes.sm,
		lineHeight: "1.5",
		transition: theme.transitions.default,
	},
	button: {
		base: {
			padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
			borderRadius: theme.borderRadius.md,
			fontWeight: theme.typography.fontWeights.medium,
			border: "none",
			cursor: "pointer",
			transition: theme.transitions.default,
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
		},
		primary: {
			backgroundColor: theme.colors.primary.main,
			color: theme.colors.primary.contrast,
			"&:hover": {
				backgroundColor: theme.colors.primary.dark,
			},
		},
		secondary: {
			backgroundColor: theme.colors.gray[200],
			color: theme.colors.gray[800],
			"&:hover": {
				backgroundColor: theme.colors.gray[300],
			},
		},
		danger: {
			backgroundColor: theme.colors.error.main,
			color: theme.colors.error.contrast,
			"&:hover": {
				backgroundColor: theme.colors.error.dark,
			},
		},
		disabled: {
			opacity: 0.5,
			cursor: "not-allowed",
			"&:hover": {
				transform: "none",
			},
		},
	},
	table: {
		container: {
			width: "100%",
			overflowX: "auto",
			borderRadius: theme.borderRadius.lg,
			boxShadow: theme.shadows.md,
		},
		table: {
			width: "100%",
			borderCollapse: "collapse",
		},
		header: {
			backgroundColor: theme.colors.gray[50],
		},
		headerCell: {
			padding: theme.spacing.md,
			fontSize: theme.typography.fontSizes.xs,
			fontWeight: theme.typography.fontWeights.medium,
			color: theme.colors.gray[600],
			textTransform: "uppercase",
			letterSpacing: "0.05em",
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
			backgroundColor: `${theme.colors.primary.light}10`,
		},
		cell: {
			padding: theme.spacing.md,
			fontSize: theme.typography.fontSizes.sm,
			color: theme.colors.gray[700],
		},
	},
};

// Add styles to theme object
theme.styles = styleObjects;

// Export styles separately for convenience
export const styles = styleObjects;

export default theme;
