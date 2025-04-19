import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:3001/api";

function App() {
	// --- State Variables ---
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // For initial fetch
	const [error, setError] = useState(null); // For initial fetch/general errors

	// Form state (unified for Add/Edit inputs)
	const [formName, setFormName] = useState("");
	const [formQuantity, setFormQuantity] = useState("");
	const [formDescription, setFormDescription] = useState("");

	// Edit mode state
	const [editingItemId, setEditingItemId] = useState(null); // ID of item being edited, or null

	// **Separated** Loading/Error States for Operations
	const [isAdding, setIsAdding] = useState(false);
	const [addError, setAddError] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	// --- Data Fetching ---
	const fetchItems = useCallback(async () => {
		console.log("Fetching items...");
		setIsLoading(true);
		setError(null);
		setDeleteError(null);
		setAddError(null); // Clear operation errors on fetch
		setUpdateError(null);
		try {
			const response = await axios.get(`${API_BASE_URL}/items`);
			setItems(response.data);
		} catch (err) {
			console.error("Error fetching items:", err);
			setError(
				"Failed to fetch inventory items. Ensure the backend is running.",
			);
			setItems([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchItems();
	}, [fetchItems]);

	// --- Reset Form ---
	const resetForm = () => {
		setFormName("");
		setFormQuantity("");
		setFormDescription("");
		setEditingItemId(null);
		setAddError(null); // Clear specific errors on reset
		setUpdateError(null);
	};

	// --- Start Editing ---
	const handleStartEdit = (item) => {
		setEditingItemId(item.id);
		setFormName(item.name);
		setFormQuantity(String(item.quantity));
		setFormDescription(item.description || "");
		setAddError(null); // Clear errors when starting edit
		setUpdateError(null);
		window.scrollTo(0, document.body.scrollHeight);
	};

	// --- Form Submission Handler (Still unified logic, but uses separate states) ---
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validation (common for both)
		const quantityNum = parseInt(formQuantity, 10);
		if (!formName.trim() || isNaN(quantityNum) || quantityNum < 0) {
			// Show error based on mode, but use a generic message here maybe? Or set both?
			// Let's set a generic form error or use updateError if editing? Simpler to use one:
			if (editingItemId) {
				setUpdateError(
					"Please enter a valid item name and a non-negative quantity.",
				);
			} else {
				setAddError(
					"Please enter a valid item name and a non-negative quantity.",
				);
			}
			return; // Stop submission
		}

		const itemData = {
			name: formName.trim(),
			quantity: quantityNum,
			description: formDescription.trim() || null,
		};

		// --- Call Appropriate API based on mode ---
		if (editingItemId) {
			// --- UPDATE ---
			setUpdateError(null); // Clear previous update error
			setIsUpdating(true); // Set updating flag
			try {
				console.log(`Updating item ${editingItemId} with data:`, itemData);
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
				resetForm(); // Reset form on success
			} catch (err) {
				console.error(`Error updating item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setUpdateError(`Failed to update item: ${backendError}`);
			} finally {
				setIsUpdating(false); // Clear updating flag
			}
		} else {
			// --- ADD ---
			setAddError(null); // Clear previous add error
			setIsAdding(true); // Set adding flag
			try {
				console.log("Adding new item with data:", itemData);
				const response = await axios.post(`${API_BASE_URL}/items`, itemData);
				setItems((prevItems) =>
					[...prevItems, response.data].sort((a, b) =>
						a.name.localeCompare(b.name),
					),
				);
				console.log("Add successful:", response.data);
				resetForm(); // Reset form on success
			} catch (err) {
				console.error(`Error adding item:`, err);
				const backendError =
					err.response?.data?.error || "An unexpected error occurred.";
				setAddError(`Failed to add item: ${backendError}`);
			} finally {
				setIsAdding(false); // Clear adding flag
			}
		}
	};

	// --- Delete Item Logic (existing, ensures clearing specific errors) ---
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

	// --- Rendering Logic ---
	return (
		<div className='App'>
			<h1>SimpleStock Inventory</h1>

			{/* Display Global Errors/Loading */}
			{isLoading && <p>Loading inventory...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

			{/* Display Item List */}
			{!isLoading && !error && (
				<div>
					<h2>Current Stock</h2>
					{items.length === 0 ? (
						<p>No items currently in stock.</p>
					) : (
						<table
							border='1'
							style={{
								width: "100%",
								borderCollapse: "collapse",
								marginBottom: "20px",
							}}>
							<thead>
								<tr>
									<th style={{ padding: "5px" }}>Name</th>
									<th style={{ padding: "5px" }}>Quantity</th>
									<th style={{ padding: "5px" }}>Description</th>
									<th style={{ padding: "5px", width: "120px" }}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item) => (
									<tr
										key={item.id}
										style={
											editingItemId === item.id
												? { backgroundColor: "#e0f7fa" }
												: {}
										}>
										<td style={{ padding: "5px" }}>{item.name}</td>
										<td style={{ padding: "5px", textAlign: "right" }}>
											{item.quantity}
										</td>
										<td style={{ padding: "5px" }}>{item.description}</td>
										<td style={{ padding: "5px", textAlign: "center" }}>
											<button
												onClick={() => handleStartEdit(item)}
												// Disable if adding OR updating OR already editing this one
												disabled={
													isAdding || isUpdating || editingItemId === item.id
												}
												style={{ marginRight: "5px" }}>
												Edit
											</button>
											<button
												onClick={() => handleDeleteItem(item.id)}
												// Disable if adding OR updating
												disabled={isAdding || isUpdating}>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}

			{/* Add/Edit Item Form */}
			<hr />
			<div>
				<h2>{editingItemId ? "Edit Item" : "Add New Item"}</h2>
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemName'>Name: </label>
						<input
							type='text'
							id='itemName'
							value={formName}
							onChange={(e) => setFormName(e.target.value)}
							required
							// Disable if EITHER adding or updating
							disabled={isAdding || isUpdating}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemQuantity'>Quantity: </label>
						<input
							type='number'
							id='itemQuantity'
							value={formQuantity}
							onChange={(e) => setFormQuantity(e.target.value)}
							required
							min='0'
							disabled={isAdding || isUpdating}
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor='itemDescription'>Description: </label>
						<input
							type='text'
							id='itemDescription'
							value={formDescription}
							onChange={(e) => setFormDescription(e.target.value)}
							disabled={isAdding || isUpdating}
						/>
					</div>

					{/* Display ADD Error */}
					{addError && <p style={{ color: "red" }}>{addError}</p>}
					{/* Display UPDATE Error */}
					{updateError && <p style={{ color: "red" }}>{updateError}</p>}

					{/* Submit Button - text changes based on mode and loading state */}
					<button type='submit' disabled={isAdding || isUpdating}>
						{
							editingItemId
								? isUpdating
									? "Saving..."
									: "Save Changes" // In edit mode
								: isAdding
								? "Adding..."
								: "Add Item" // In add mode
						}
					</button>

					{/* Cancel Edit Button */}
					{editingItemId && (
						<button
							type='button'
							onClick={resetForm}
							// Disable only if actively updating this item
							disabled={isUpdating}
							style={{ marginLeft: "10px" }}>
							Cancel Edit
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default App;
