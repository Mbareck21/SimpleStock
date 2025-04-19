import React from "react";
import { theme } from "../styles/theme";
import LoadingSpinner from "./LoadingSpinner";

const InventoryTable = ({
	items,
	editingItemId,
	handleStartEdit,
	handleDeleteItem,
	isAdding,
	isUpdating,
	searchTerm,
}) => {
	if (items.length === 0) {
		return (
			<div
				style={{
					backgroundColor: "white",
					borderRadius: theme.borderRadius.lg,
					boxShadow: theme.shadows.md,
					padding: theme.spacing["2xl"],
					textAlign: "center",
				}}>
				<svg
					style={{
						height: "3rem",
						width: "3rem",
						margin: "0 auto",
						color: theme.colors.gray[400],
					}}
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					aria-hidden='true'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
					/>
				</svg>
				<h3
					style={{
						marginTop: theme.spacing.md,
						fontSize: theme.typography.fontSizes.lg,
						fontWeight: theme.typography.fontWeights.medium,
						color: theme.colors.gray[900],
					}}>
					{searchTerm
						? "No items match your search."
						: "No items currently in stock."}
				</h3>
				<p
					style={{
						marginTop: theme.spacing.xs,
						fontSize: theme.typography.fontSizes.sm,
						color: theme.colors.gray[500],
					}}>
					{searchTerm
						? "Try adjusting your search terms."
						: "Get started by adding an item to your inventory."}
				</p>
			</div>
		);
	}

	return (
		<div
			style={{
				overflowX: "auto",
				backgroundColor: "white",
				borderRadius: theme.borderRadius.lg,
				boxShadow: theme.shadows.md,
			}}>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
				}}>
				<thead style={{ backgroundColor: theme.colors.gray[50] }}>
					<tr>
						<th
							style={{
								padding: theme.spacing.md,
								textAlign: "left",
								fontSize: theme.typography.fontSizes.xs,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[500],
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								borderBottom: `1px solid ${theme.colors.gray[200]}`,
							}}>
							Name
						</th>
						<th
							style={{
								padding: theme.spacing.md,
								textAlign: "right",
								fontSize: theme.typography.fontSizes.xs,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[500],
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								borderBottom: `1px solid ${theme.colors.gray[200]}`,
							}}>
							Quantity
						</th>
						<th
							style={{
								padding: theme.spacing.md,
								textAlign: "left",
								fontSize: theme.typography.fontSizes.xs,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[500],
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								borderBottom: `1px solid ${theme.colors.gray[200]}`,
							}}>
							Description
						</th>
						<th
							style={{
								padding: theme.spacing.md,
								textAlign: "center",
								fontSize: theme.typography.fontSizes.xs,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[500],
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								width: "8rem",
								borderBottom: `1px solid ${theme.colors.gray[200]}`,
							}}>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr
							key={item.id}
							style={{
								backgroundColor:
									editingItemId === item.id
										? theme.colors.primary.light + "15"
										: "white",
								transition: "background-color 0.2s ease",
								borderBottom: `1px solid ${theme.colors.gray[200]}`,
							}}
							onMouseEnter={(e) => {
								if (editingItemId !== item.id) {
									e.currentTarget.style.backgroundColor = theme.colors.gray[50];
								}
							}}
							onMouseLeave={(e) => {
								if (editingItemId !== item.id) {
									e.currentTarget.style.backgroundColor = "white";
								}
							}}>
							<td
								style={{
									padding: theme.spacing.md,
									fontSize: theme.typography.fontSizes.sm,
									fontWeight: theme.typography.fontWeights.medium,
									color: theme.colors.gray[900],
								}}>
								{item.name}
							</td>
							<td
								style={{
									padding: theme.spacing.md,
									fontSize: theme.typography.fontSizes.sm,
									textAlign: "right",
									color: theme.colors.gray[900],
								}}>
								{item.quantity}
							</td>
							<td
								style={{
									padding: theme.spacing.md,
									fontSize: theme.typography.fontSizes.sm,
									color: theme.colors.gray[600],
									maxWidth: "20rem",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}>
								{item.description || "—"}
							</td>
							<td
								style={{
									padding: theme.spacing.md,
									textAlign: "center",
								}}>
								<div
									style={{
										display: "flex",
										gap: "0.5rem",
										justifyContent: "center",
									}}>
									<button
										onClick={() => handleStartEdit(item)}
										disabled={
											isAdding || isUpdating || editingItemId === item.id
										}
										style={{
											padding: "0.5rem",
											borderRadius: theme.borderRadius.md,
											color: theme.colors.primary.main,
											backgroundColor: "transparent",
											border: "none",
											cursor:
												isAdding || isUpdating || editingItemId === item.id
													? "not-allowed"
													: "pointer",
											opacity:
												isAdding || isUpdating || editingItemId === item.id
													? 0.5
													: 1,
											transition: "all 0.2s ease",
										}}
										title='Edit'>
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
												d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
											/>
										</svg>
									</button>

									<button
										onClick={() => handleDeleteItem(item.id)}
										disabled={isAdding || isUpdating}
										style={{
											padding: "0.5rem",
											borderRadius: theme.borderRadius.md,
											color: theme.colors.error.main,
											backgroundColor: "transparent",
											border: "none",
											cursor:
												isAdding || isUpdating ? "not-allowed" : "pointer",
											opacity: isAdding || isUpdating ? 0.5 : 1,
											transition: "all 0.2s ease",
										}}
										title='Delete'>
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
												d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
											/>
										</svg>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default InventoryTable;
