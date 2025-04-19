import React, { useRef, useEffect } from "react";
import { theme } from "../styles/theme";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
	const inputRef = useRef(null);

	// Focus search input on component mount
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// Handle input changes with debounce handled by parent component
	const handleChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	// Clear search
	const handleClear = () => {
		setSearchTerm("");
		onSearch("");
		inputRef.current?.focus();
	};

	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: theme.borderRadius.lg,
				boxShadow: theme.shadows.md,
				padding: theme.spacing.lg,
				marginBottom: theme.spacing.lg,
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}>
				<label
					htmlFor='searchItems'
					style={{
						fontSize: theme.typography.fontSizes.sm,
						fontWeight: theme.typography.fontWeights.medium,
						color: theme.colors.gray[700],
						marginBottom: theme.spacing.xs,
					}}>
					Search Inventory
				</label>

				<div style={{ position: "relative" }}>
					{/* Search Icon */}
					<div
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							left: 0,
							display: "flex",
							alignItems: "center",
							paddingLeft: theme.spacing.md,
							pointerEvents: "none",
						}}>
						<svg
							style={{
								height: "1.25rem",
								width: "1.25rem",
								color: theme.colors.gray[400],
							}}
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
								clipRule='evenodd'
							/>
						</svg>
					</div>

					{/* Search Input */}
					<input
						ref={inputRef}
						type='text'
						id='searchItems'
						value={searchTerm}
						onChange={handleChange}
						placeholder='Search by name or description...'
						style={{
							width: "100%",
							padding: `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.xl}`,
							paddingRight: searchTerm ? theme.spacing.xl : theme.spacing.md,
							borderRadius: theme.borderRadius.md,
							border: `1px solid ${theme.colors.gray[300]}`,
							fontSize: theme.typography.fontSizes.base,
							outline: "none",
							transition: theme.transitions.default,
							boxShadow: theme.shadows.sm,
						}}
					/>

					{/* Clear button */}
					{searchTerm && (
						<button
							type='button'
							onClick={handleClear}
							aria-label='Clear search'
							style={{
								position: "absolute",
								top: 0,
								bottom: 0,
								right: 0,
								display: "flex",
								alignItems: "center",
								paddingRight: theme.spacing.md,
								background: "none",
								border: "none",
								cursor: "pointer",
							}}>
							<svg
								style={{
									height: "1.25rem",
									width: "1.25rem",
									color: theme.colors.gray[400],
									transition: theme.transitions.default,
								}}
								onMouseOver={(e) =>
									(e.currentTarget.style.color = theme.colors.gray[600])
								}
								onMouseOut={(e) =>
									(e.currentTarget.style.color = theme.colors.gray[400])
								}
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					)}
				</div>

				{/* Search results count when searching */}
				{searchTerm && (
					<div
						style={{
							marginTop: theme.spacing.xs,
							fontSize: theme.typography.fontSizes.sm,
							color: theme.colors.gray[500],
							fontStyle: "italic",
						}}>
						Press Enter to search, or clear to show all items.
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
