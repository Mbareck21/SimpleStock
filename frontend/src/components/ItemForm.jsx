import React from "react";
import { theme } from "../styles/theme";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import useMediaQuery from "../utils/useMediaQuery";

const ItemForm = ({
	editingItemId,
	formName,
	setFormName,
	formQuantity,
	setFormQuantity,
	formDescription,
	setFormDescription,
	handleSubmit,
	resetForm,
	isAdding,
	isUpdating,
	addError,
	updateError,
}) => {
	// Use our custom media query hook to handle responsive design
	const isTabletOrLarger = useMediaQuery(
		`(min-width: ${theme.breakpoints.md})`,
	);

	return (
		<div>
			<h2
				style={{
					fontSize: theme.typography.fontSizes.xl,
					fontWeight: theme.typography.fontWeights.bold,
					marginBottom: theme.spacing.md,
					color: theme.colors.gray[800],
				}}>
				{editingItemId ? "Edit Item" : "Add New Item"}
			</h2>

			{addError && <ErrorMessage message={addError} />}
			{updateError && <ErrorMessage message={updateError} />}

			<form onSubmit={handleSubmit}>
				<div
					style={{
						display: "grid",
						// Use the media query result to conditionally set the columns
						gridTemplateColumns: isTabletOrLarger
							? "repeat(2, minmax(0, 1fr))"
							: "repeat(1, minmax(0, 1fr))",
						gap: theme.spacing.md,
						marginBottom: theme.spacing.lg,
					}}>
					<div>
						<label
							htmlFor='itemName'
							style={{
								display: "block",
								fontSize: theme.typography.fontSizes.sm,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[700],
								marginBottom: theme.spacing.xs,
							}}>
							Name <span style={{ color: theme.colors.error.main }}>*</span>
						</label>
						<input
							type='text'
							id='itemName'
							style={{
								width: "100%",
								padding: `${theme.spacing.sm} ${theme.spacing.md}`,
								border: `1px solid ${theme.colors.gray[300]}`,
								borderRadius: theme.borderRadius.md,
								boxShadow: theme.shadows.sm,
								outline: "none",
								transition: `border-color ${theme.transitions.default}, box-shadow ${theme.transitions.default}`,
								fontSize: theme.typography.fontSizes.base,
							}}
							value={formName}
							onChange={(e) => setFormName(e.target.value)}
							placeholder='Product name'
							required
							disabled={isAdding || isUpdating}
							autoFocus
						/>
					</div>

					<div>
						<label
							htmlFor='itemQuantity'
							style={{
								display: "block",
								fontSize: theme.typography.fontSizes.sm,
								fontWeight: theme.typography.fontWeights.medium,
								color: theme.colors.gray[700],
								marginBottom: theme.spacing.xs,
							}}>
							Quantity <span style={{ color: theme.colors.error.main }}>*</span>
						</label>
						<input
							type='number'
							id='itemQuantity'
							style={{
								width: "100%",
								padding: `${theme.spacing.sm} ${theme.spacing.md}`,
								border: `1px solid ${theme.colors.gray[300]}`,
								borderRadius: theme.borderRadius.md,
								boxShadow: theme.shadows.sm,
								outline: "none",
								transition: `border-color ${theme.transitions.default}, box-shadow ${theme.transitions.default}`,
								fontSize: theme.typography.fontSizes.base,
							}}
							value={formQuantity}
							onChange={(e) => setFormQuantity(e.target.value)}
							placeholder='0'
							required
							min='0'
							disabled={isAdding || isUpdating}
						/>
					</div>
				</div>

				<div style={{ marginBottom: theme.spacing.lg }}>
					<label
						htmlFor='itemDescription'
						style={{
							display: "block",
							fontSize: theme.typography.fontSizes.sm,
							fontWeight: theme.typography.fontWeights.medium,
							color: theme.colors.gray[700],
							marginBottom: theme.spacing.xs,
						}}>
						Description
					</label>
					<textarea
						id='itemDescription'
						rows='3'
						style={{
							width: "100%",
							padding: `${theme.spacing.sm} ${theme.spacing.md}`,
							border: `1px solid ${theme.colors.gray[300]}`,
							borderRadius: theme.borderRadius.md,
							boxShadow: theme.shadows.sm,
							outline: "none",
							transition: `border-color ${theme.transitions.default}, box-shadow ${theme.transitions.default}`,
							fontSize: theme.typography.fontSizes.base,
							fontFamily: theme.typography.fontFamily,
						}}
						value={formDescription}
						onChange={(e) => setFormDescription(e.target.value)}
						placeholder='Optional description'
						disabled={isAdding || isUpdating}
					/>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						gap: theme.spacing.md,
						paddingTop: theme.spacing.md,
						borderTop: `1px solid ${theme.colors.gray[200]}`,
					}}>
					{editingItemId && (
						<button
							type='button'
							onClick={resetForm}
							disabled={isUpdating}
							style={{
								padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
								borderRadius: theme.borderRadius.md,
								backgroundColor: theme.colors.gray[200],
								color: theme.colors.gray[800],
								fontWeight: theme.typography.fontWeights.medium,
								border: "none",
								cursor: isUpdating ? "not-allowed" : "pointer",
								opacity: isUpdating ? 0.5 : 1,
								transition: "all 0.2s ease",
							}}
							onMouseEnter={(e) => {
								if (!isUpdating) {
									e.currentTarget.style.backgroundColor =
										theme.colors.gray[300];
									e.currentTarget.style.transform = "translateY(-1px)";
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = theme.colors.gray[200];
								e.currentTarget.style.transform = "translateY(0)";
							}}>
							Cancel
						</button>
					)}

					<button
						type='submit'
						disabled={isAdding || isUpdating}
						style={{
							padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
							borderRadius: theme.borderRadius.md,
							backgroundColor: theme.colors.primary.main,
							color: "white",
							fontWeight: theme.typography.fontWeights.medium,
							border: "none",
							cursor: isAdding || isUpdating ? "not-allowed" : "pointer",
							opacity: isAdding || isUpdating ? 0.5 : 1,
							transition: "all 0.2s ease",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minWidth: "8rem",
						}}
						onMouseEnter={(e) => {
							if (!(isAdding || isUpdating)) {
								e.currentTarget.style.backgroundColor =
									theme.colors.primary.dark;
								e.currentTarget.style.transform = "translateY(-1px)";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = theme.colors.primary.main;
							e.currentTarget.style.transform = "translateY(0)";
						}}>
						{editingItemId ? (
							isUpdating ? (
								<div style={{ display: "flex", alignItems: "center" }}>
									<LoadingSpinner size='sm' color='white' />
									<span style={{ marginLeft: theme.spacing.sm }}>
										Saving...
									</span>
								</div>
							) : (
								"Save Changes"
							)
						) : isAdding ? (
							<div style={{ display: "flex", alignItems: "center" }}>
								<LoadingSpinner size='sm' color='white' />
								<span style={{ marginLeft: theme.spacing.sm }}>Adding...</span>
							</div>
						) : (
							"Add Item"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ItemForm;
