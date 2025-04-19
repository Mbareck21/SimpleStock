// filepath: e:\projects\SimpleStock\frontend\src\components\LoadingSpinner.jsx
import React from "react";
import { theme } from "../styles/theme";

/**
 * LoadingSpinner Component
 *
 * A reusable loading indicator with size and color customization.
 *
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Size of the spinner: 'sm', 'md', or 'lg'
 * @param {string} [props.color='primary'] - Color of the spinner from theme colors
 * @param {string} [props.thickness='2px'] - Thickness of the spinner stroke
 */
const LoadingSpinner = ({
	size = "md",
	color = "primary",
	thickness = "2px",
}) => {
	// Size mapping
	const sizeMap = {
		sm: "1rem",
		md: "1.5rem",
		lg: "2rem",
	};

	// Get actual dimensions
	const dimensions = sizeMap[size] || sizeMap.md;

	// Get color from theme
	const spinnerColor = theme.colors[color]?.main || theme.colors.primary.main;

	return (
		<div
			style={{
				display: "inline-block",
				position: "relative",
				width: dimensions,
				height: dimensions,
			}}
			role='status'
			aria-label='Loading'>
			<svg
				style={{
					animation: "spin 1s linear infinite",
					width: "100%",
					height: "100%",
				}}
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'>
				<circle
					style={{
						opacity: 0.25,
					}}
					cx='12'
					cy='12'
					r='10'
					stroke={spinnerColor}
					fill='none'
					strokeWidth={thickness}
				/>
				<path
					style={{
						opacity: 0.75,
					}}
					fill={spinnerColor}
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
				/>
			</svg>

			<style jsx='true'>{`
				@keyframes spin {
					to {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	);
};

export default LoadingSpinner;
