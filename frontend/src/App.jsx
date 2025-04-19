import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
// Import the new 2025 theme
import theme2025 from "./styles/theme2025";

// Import components
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import InventoryTable from "./components/InventoryTable";
import ItemForm from "./components/ItemForm";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";

const API_BASE_URL = "http://localhost:3001/api";

function App() {
	// --- State Variables ---
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Form state
	const [formName, setFormName] = useState("");
	const [formQuantity, setFormQuantity] = useState("");
	const [formDescription, setFormDescription] = useState("");

	// Edit mode state
	const [editingItemId, setEditingItemId] = useState(null);
	// **Separated** Loading/Error States for Operations
	const [isAdding, setIsAdding] = useState(false);
	const [addError, setAddError] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	// *** Search State ***
	const [searchTerm, setSearchTerm] = useState("");

	// --- Data Fetching (Modified) ---
	const fetchItems = useCallback(async (currentSearchTerm) => {
		console.log(`Fetching items with search term: "${currentSearchTerm}"`);
		setIsLoading(true);
		setError(null);
		// Clear operational errors when fetching
		setDeleteError(null);
		setAddError(null);
		setUpdateError(null);

		// Prepare query parameters
		const params = {};
		if (currentSearchTerm && currentSearchTerm.trim() !== "") {
			params.search = currentSearchTerm.trim();
		}

		try {
			// Pass params to axios.get - axios automatically formats them into query string
			const response = await axios.get(`${API_BASE_URL}/items`, { params });
			setItems(response.data);
		} catch (err) {
			console.error("Error fetching inventory items:", err);
			const errorMessage =
				err.response?.data?.error ||
				"Failed to load inventory. Please try again.";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Initial data fetch
	useEffect(() => {
		fetchItems(searchTerm);
	}, [fetchItems, searchTerm]);

	// --- Reset Form ---
	const resetForm = () => {
		setFormName("");
		setFormQuantity("");
		setFormDescription("");
		setEditingItemId(null);
		setAddError(null);
		setUpdateError(null);
	};

	// --- Start Editing ---
	const handleStartEdit = (item) => {
		setEditingItemId(item.id);
		setFormName(item.name);
		setFormQuantity(String(item.quantity));
		setFormDescription(item.description || "");
		setAddError(null);
		setUpdateError(null);
		// Smooth scroll to form
		document
			.getElementById("item-form")
			?.scrollIntoView({ behavior: "smooth" });
	};

	// --- Form Submission Handler ---
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validation
		const quantityNum = parseInt(formQuantity, 10);
		if (!formName.trim() || isNaN(quantityNum) || quantityNum < 0) {
			if (editingItemId) {
				setUpdateError("Please fill out all required fields correctly.");
			} else {
				setAddError("Please fill out all required fields correctly.");
			}
			return;
		}

		const itemData = {
			name: formName.trim(),
			quantity: quantityNum,
			description: formDescription.trim() || null,
		};

		// --- Call Appropriate API based on mode ---
		if (editingItemId) {
			// --- UPDATE ---
			setUpdateError(null);
			setIsUpdating(true);
			try {
				const response = await axios.put(
					`${API_BASE_URL}/items/${editingItemId}`,
					itemData,
				);
				setItems((prevItems) =>
					prevItems
						.map((item) => (item.id === editingItemId ? response.data : item))
						.sort((a, b) => a.name.localeCompare(b.name)),
				);
				console.log("Update successful:", response.data);
				resetForm();
			} catch (err) {
				console.error(`Error updating item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setUpdateError(`Failed to update item: ${backendError}`);
			} finally {
				setIsUpdating(false);
			}
		} else {
			// --- ADD ---
			setAddError(null);
			setIsAdding(true);
			try {
				console.log("Adding new item with data:", itemData);
				const response = await axios.post(`${API_BASE_URL}/items`, itemData);
				setItems((prevItems) =>
					[...prevItems, response.data].sort((a, b) =>
						a.name.localeCompare(b.name),
					),
				);
				console.log("Add successful:", response.data);
				resetForm();
			} catch (err) {
				console.error(`Error adding item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setAddError(`Failed to add item: ${backendError}`);
			} finally {
				setIsAdding(false);
			}
		}
	};

	// --- Delete Item Logic ---
	const handleDeleteItem = async (itemIdToDelete) => {
		if (!window.confirm("Are you sure you want to delete this item?")) {
			return;
		}
		setDeleteError(null);
		if (itemIdToDelete === editingItemId) {
			resetForm();
		}

		try {
			await axios.delete(`${API_BASE_URL}/items/${itemIdToDelete}`);
			setItems((prevItems) =>
				prevItems.filter((item) => item.id !== itemIdToDelete),
			);
			// Clear other errors on successful delete
			setAddError(null);
			setUpdateError(null);
			setError(null);
			console.log(`Item ${itemIdToDelete} deleted successfully.`);
		} catch (err) {
			console.error(`Error deleting item with ID ${itemIdToDelete}:`, err);
			const backendError =
				err.response?.data?.error || "An unexpected error occurred.";
			setDeleteError(
				`Failed to delete item: ${backendError}. Please try again.`,
			);
		}
	};

	// Handle search with debounce
	const handleSearch = (value) => {
		setSearchTerm(value);
		// Simple debounce
		const timeoutId = setTimeout(() => {
			fetchItems(value);
		}, 300);

		return () => clearTimeout(timeoutId);
	};

	return (
		<div
			style={{
				// Use CSS variables for background and font for themeability
				backgroundColor: "var(--color-background)",
				minHeight: "100vh",
				fontFamily: "var(--font-family-sans)",
				color: "var(--color-text-primary)", // Set default text color
				transition: "background-color 0.3s ease, color 0.3s ease", // Smooth theme transitions
			}}>
			{/* Header Component - Will need updating separately */}
			<Header />

			{/* Main Content */}
			<main
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					// Use theme variables for spacing
					padding: `var(--spacing-6) var(--spacing-8)`,
					// Use theme animation
					animation: `${theme2025.animations.variants.fadeIn} 0.5s ease-out`,
				}}>
				{/* Search Bar - Will need updating separately */}
				<div style={{ marginBottom: `var(--spacing-8)` }}>
					<SearchBar
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						onSearch={handleSearch}
					/>
				</div>

				{/* Error Display - Will need updating separately */}
				{error && (
					<div style={{ marginBottom: `var(--spacing-6)` }}>
						<ErrorMessage message={error} />
					</div>
				)}
				{deleteError && (
					<div style={{ marginBottom: `var(--spacing-6)` }}>
						<ErrorMessage message={deleteError} />
					</div>
				)}

				{/* Inventory Section */}
				<section style={{ marginBottom: `var(--spacing-12)` }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: `var(--spacing-6)`,
						}}>
						<h2
							style={{
								// Use theme variables for typography
								fontSize: `var(--font-size-3xl)`,
								fontWeight: `var(--font-weight-bold)`,
								color: `var(--color-text-primary)`,
							}}>
							Inventory
						</h2>
						<div
							style={{
								fontSize: `var(--font-size-sm)`,
								color: `var(--color-text-secondary)`,
							}}>
							{items.length} {items.length === 1 ? "item" : "items"} in stock
						</div>
					</div>

					{/* Loading State */}
					{isLoading ? (
						<div
							style={{
								// Use default card style from the new theme
								...theme2025.styles.card.default,
								padding: `var(--spacing-12)`,
								textAlign: "center",
							}}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: `var(--spacing-4)`,
								}}>
								{/* LoadingSpinner will need updating separately */}
								<LoadingSpinner size='lg' />
							</div>
							<p style={{ color: `var(--color-text-secondary)` }}>
								Loading inventory items...
							</p>
						</div>
					) : (
						// InventoryTable will need updating separately
						<InventoryTable
							items={items}
							editingItemId={editingItemId}
							handleStartEdit={handleStartEdit}
							handleDeleteItem={handleDeleteItem}
							isAdding={isAdding}
							isUpdating={isUpdating}
							searchTerm={searchTerm}
						/>
					)}
				</section>

				{/* Form Section */}
				<section
					id='item-form'
					style={{
						marginBottom: `var(--spacing-16)`,
						scrollMarginTop: "5rem", // Adjust for potentially sticky header later
					}}>
					<div
						style={{
							// Use default card style from the new theme
							...theme2025.styles.card.default,
						}}>
						{/* ItemForm will need updating separately */}
						<ItemForm
							editingItemId={editingItemId}
							formName={formName}
							setFormName={setFormName}
							formQuantity={formQuantity}
							setFormQuantity={setFormQuantity}
							formDescription={formDescription}
							setFormDescription={setFormDescription}
							handleSubmit={handleSubmit}
							resetForm={resetForm}
							isAdding={isAdding}
							isUpdating={isUpdating}
							addError={addError}
							updateError={updateError}
						/>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer
				style={{
					backgroundColor: `var(--color-surface-variant)`,
					borderTop: `1px solid var(--color-divider)`,
					padding: `var(--spacing-4)`,
					marginTop: `var(--spacing-16)`,
				}}>
				<div
					style={{
						maxWidth: "1200px",
						margin: "0 auto",
						textAlign: "center",
						fontSize: `var(--font-size-sm)`,
						color: `var(--color-text-secondary)`,
					}}>
					&copy; {new Date().getFullYear()} SimpleStock Inventory Management
					System
				</div>
			</footer>
		</div>
	);
}

export default App;
