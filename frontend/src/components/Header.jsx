import React from "react";
import { theme } from "../styles/theme";

const Header = () => {
	return (
		<header
			style={{
				backgroundColor: theme.colors.primary.main,
				color: "white",
				boxShadow: theme.shadows.md,
			}}>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: `${theme.spacing.md} ${theme.spacing.lg}`,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<div style={{ display: "flex", alignItems: "center" }}>
					<svg
						style={{
							height: "2rem",
							width: "2rem",
							marginRight: theme.spacing.md,
						}}
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<path d='M20 7h-9'></path>
						<path d='M14 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2'></path>
						<path d='M6 9h16v10H6z'></path>
					</svg>
					<h1
						style={{
							fontSize: theme.typography.fontSizes["2xl"],
							fontWeight: theme.typography.fontWeights.bold,
						}}>
						SimpleStock
					</h1>
				</div>
				<div
					style={{
						fontSize: theme.typography.fontSizes.base,
					}}>
					Inventory Management System
				</div>
			</div>
		</header>
	);
};

export default Header;
