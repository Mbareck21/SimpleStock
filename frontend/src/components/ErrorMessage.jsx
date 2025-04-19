import React from "react";
import { theme } from "../styles/theme";

const ErrorMessage = ({ message }) => {
	if (!message) return null;

	return (
		<div
			style={{
				backgroundColor: theme.colors.error.light + "10", // Light opacity version
				borderLeftWidth: "4px",
				borderLeftStyle: "solid",
				borderLeftColor: theme.colors.error.main,
				padding: theme.spacing.md,
				marginBottom: theme.spacing.lg,
				borderRadius:
					"0 " + theme.borderRadius.md + " " + theme.borderRadius.md + " 0",
				animation: "fadeIn 0.3s ease-out",
			}}>
			<div style={{ display: "flex" }}>
				<div
					style={{
						flexShrink: 0,
						color: theme.colors.error.main,
					}}>
					<svg
						style={{
							height: "1.25rem",
							width: "1.25rem",
						}}
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
						/>
					</svg>
				</div>
				<div
					style={{
						marginLeft: theme.spacing.md,
						fontSize: theme.typography.fontSizes.sm,
						color: theme.colors.error.dark,
					}}>
					{message}
				</div>
			</div>
		</div>
	);
};

export default ErrorMessage;
